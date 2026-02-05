import getInvoicesForDashboard from "@/lib/getInvoiceForDashboard";
import Link from "next/link";

export default async function Dashboard() {
  const invoices = await getInvoicesForDashboard();
  if (!invoices) {
    return <p>No Invoices Yet!</p>;
  }
  return (
    <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
      <div> Welcome to Dashboard! </div>
      <div>INVOICES : </div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <Link href={`/invoices/${invoice.id}`}>
              {invoice.invoiceNumber} - {invoice.client.name} - ₹
              {invoice.totalAmount}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
