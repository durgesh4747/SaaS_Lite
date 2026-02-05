"use server"

import getCurrentUser from "@/lib/auth"
import prisma from "@/lib/prisma";
import { invoiceSchema } from "@/lib/validation";

export default async function createInvoice(formData:unknown) {
    const user = await getCurrentUser();
    const parsed = invoiceSchema.safeParse(formData);
    if(!parsed.success){
        throw new Error("Invalid Invoice Data")
    }
    const data = parsed.data;

    let clientId:number;
    if(data?.clientId){
        const client = await prisma.client.findFirst({
            where:{
                id:data.clientId,
                userId:user.id
            }
        })
        if(!client){
            throw new Error("Client not Found")
        }
        clientId = client.id;
    }
    else{
        const client = await prisma.client.create({
            data:{
                name:data.clientName!,
                userId:user.id
            }
        })
        clientId = client.id;
    }
    const totalAmount = data.items.reduce(
        (sum,item) => sum + item.quantity * item.price,0 // 0 - initial value
    )
    const invoice = await prisma.invoice.create({
        data:{
            invoiceNumber:data.invoiceNumber,
            issueDate:data.issueDate,
            totalAmount,
            userId:user.id,
            clientId,
            items:{
                create: data.items.map((item)=>({
                    description:item.description,
                    quantity:item.quantity,
                    price:item.price
                })),
            },
        }
    })
    return invoice
}
