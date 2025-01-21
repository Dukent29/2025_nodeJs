const express = require('express');
const router = express.Router();
const generateInvoice = require('../invoiceGenerator');

router.get('/generateInvoice', (req, res, next) => {
    const invoiceData = {
        invoiceNumber: '12345',
        date: new Date().toLocaleDateString(),
        customerName: 'John Doe',
        amount: '100.00'
    };

    const path = './invoice.pdf';
    generateInvoice(invoiceData, path);

    res.status(200).json({ message: 'Invoice generated successfully', path });
});

module.exports = router;