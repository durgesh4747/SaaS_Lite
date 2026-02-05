import getInvoicebyID, { InvoiceWithClientAndItems } from "@/lib/getInvoicebyID";

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = Number(params.id);
  const invoice: InvoiceWithClientAndItems = await getInvoicebyID(invoiceId);
  return (
    <div className="flex justify-center items-center p-4">
      <p>Client : {invoice.invoiceNumber}</p>
      <p>Client : {invoice.client.name}</p>
      <p>Client : {invoice.issueDate.toDateString()}</p>

      <ul>
        {invoice.items.map((item) => (
          <li key={item.id}>
            {item.description} - {item.quantity} * ₹{item.price}
          </li>
        ))}
      </ul>
      <p>Total : ₹{invoice.totalAmount}</p>
    </div>
  );
}
