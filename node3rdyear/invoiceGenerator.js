const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateInvoice = (invoiceData, path) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(25).text('Invoice', { align: 'center' });

    doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoiceNumber}`, { align: 'left' });
    doc.text(`Date: ${invoiceData.date}`, { align: 'left' });
    doc.text(`Customer Name: ${invoiceData.customerName}`, { align: 'left' });
    doc.text(`Amount: $${invoiceData.amount}`, { align: 'left' });

    doc.end();
};

module.exports = generateInvoice;