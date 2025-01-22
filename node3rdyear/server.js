const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
const compressor = require('compression');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
    level:'infor',
    format:format.simple(),
    transports:[
        new transports.Console(),
        new DailyRotateFile({
            filename:'./logs/%DATE%.log',
            datePattern:'DD-MM-YYYY',
            timestamp:true,
            hours:'00',
            minutes:'00',
            seconds:'00',
            maxSize: '20m',
            maxFiles: '7d'
        })
    ]
});


app.use(cors({
    origin:'http//bci25.portfolio-etudiant-rouen?com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
));//helpful for allowing the request from the client(means it will allow the request from the client)
app.use(compressor({
    threshold: 1024,
    fister:(req,res) => {
        if(req.headers['no compression']){
            return false;
        }
        return !req.path.match(/\.(jpg|jpeg|png|gif|pdf|mp4)$/);
    }
}));//helpful for compressing the data before sending it to the client (means it will reduce the size of the data)
//npm i winston-daily-rotate-file winston (this command line is for installing transport for rotating log file daily)
app.use(bodyParser.json());//helpful for parsing the data from the client(means it will convert the data into json format)

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

app.use(errorHandler); // Use the error handling middleware(means it will handle the error)

app.listen(5000, () => {
    console.log('je marche');
}).on('error', err => {
    console.error('Failed to start server', err);
});