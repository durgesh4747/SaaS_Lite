import { Prisma } from "@/app/generated/prisma/client";


type InvoiceWithClientAndItems = Prisma.InvoiceGetPayload<{
  include: {
    client: true;
    items: true;
  };
}>;

export function invoiceHtml(invoice: InvoiceWithClientAndItems) {
  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td>${item.description}</td>
          <td style="text-align:right;">${item.quantity}</td>
          <td style="text-align:right;">₹${item.price}</td>
          <td style="text-align:right;">₹${item.quantity * item.price}</td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
    h1 { margin-bottom: 4px; }
    .meta { margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border-bottom: 1px solid #ddd; padding: 8px; }
    th { text-align: left; background: #f5f5f5; }
    .total { text-align: right; margin-top: 24px; font-size: 18px; }
  </style>
</head>
<body>
  <h1>Invoice</h1>
  <div class="meta">
    <div><strong>Invoice #:</strong> ${invoice.invoiceNumber}</div>
    <div><strong>Client:</strong> ${invoice.client.name}</div>
    <div><strong>Date:</strong> ${invoice.issueDate.toDateString()}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align:right;">Qty</th>
        <th style="text-align:right;">Price</th>
        <th style="text-align:right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="total">
    <strong>Grand Total: ₹${invoice.totalAmount}</strong>
  </div>
</body>
</html>
`;
}
