const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

app.use(bodyParser.json());

const articleRoute = require('./route/article.route');
const presentationRoute = require('./route/presentation.route');
const invoiceRoute = require('./route/invoice.route');
const cryptoRoute = require('./route/crypto.route'); // Add this line

app.use('/article', articleRoute);
app.use('/presentation', presentationRoute);
app.use('/invoice', invoiceRoute);
app.use('/crypto', cryptoRoute); // Add this line

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/3rdyear')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use(errorHandler); // Use the error handling middleware

app.listen(5000, () => {
    console.log('je marche');
}).on('error', err => {
    console.error('Failed to start server', err);
});