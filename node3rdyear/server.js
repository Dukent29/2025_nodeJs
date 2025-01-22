const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const compressor = require('compression');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logger = createLogger({
    level: 'infor',
    format: format.simple(),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: './logs/%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            timestamp: true,
            hours: '00',
            minutes: '00',
            seconds: '00',
            maxSize: '20m',
            maxFiles: '7d'
        })
    ]
});

app.use(cors({
    origin: 'http://bci25.portfolio-etudiant-rouen.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compressor({
    threshold: 1024,
    filter: (req, res) => {
        if (req.headers['no-compression']) {
            return false;
        }
        return !req.path.match(/\.(jpg|jpeg|png|gif|pdf|mp4)$/);
    }
}));

app.use(bodyParser.json());

const articleRoute = require('./route/article.route');
const presentationRoute = require('./route/presentation.route');
const invoiceRoute = require('./route/invoice.route');
const cryptoRoute = require('./route/crypto.route');

app.use('/article', articleRoute);
app.use('/presentation', presentationRoute);
app.use('/invoice', invoiceRoute);
app.use('/crypto', cryptoRoute);

// Commenting out MongoDB connection
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/3rdyear')
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(err => {
//         console.error('Failed to connect to MongoDB', err);
//     });

app.use(errorHandler);

app.listen(5000, () => {
    console.log('je marche');
}).on('error', err => {
    console.error('Failed to start server', err);
});