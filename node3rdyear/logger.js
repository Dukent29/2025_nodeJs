require('dotenv').config(); // Load environment variables from .env file

const path = require('path'); // Correctly import the path module
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const nodemailer = require('nodemailer'); // Import nodemailer

const simpleLogFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logLevel = {
    levels: {
        info: 0,
        warn :1 ,
        error : 2,
        crit : 3
    }

}

const logFormat = format.combine(
    format.timestamp({format : 'MM-DD-YYYY HH:mm:ss'}),
    format.printf(({timestamp,level,message}) => `${timestamp} [${level.toUpperCase()}] - ${message}`)
);

const logger = createLogger({
    levels: logLevel.levels,
    format : logFormat,
    transports : [
        new transports.Console(),
        new DailyRotateFile({
            filename : path.join(__dirname, './logs/app-%DATE%.log'),
            datePattern: 'MM-DD-YYYY',
            maxSize: '5m',
        }),
        new DailyRotateFile({
            filename : path.join(__dirname, './logs/error-%DATE%.log'),
            datePattern: 'MM-DD-YYYY',
            maxSize: '5m',
        })
    ]
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email user
        pass: process.env.EMAIL_PASS  // Use environment variable for email password
    }
});

// Example usage of nodemailer
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient-email@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
});

async function sendMail(errorMessage){
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to : process.env.EMAIL_TO,
            subject : 'ALERTE CRITIQUE',
            text: `Alerte critique : ${errorMessage}`,
            html: `<h2>ALERTE CRITIQUE : ${errorMessage} </h2>`
        };
        await transporter.sendMail(mailOptions);
        console.log('Mail envoyé ');
    }catch (error ){
        console.error('Erreur', error)
    }
}
logger.on('crit', (error) => {
    console.log('Erreur critique detecté ', error.message)
    logger.crit('Erreur critique detecté ' +  error.message)
    sendMail(error.message)
})


module.exports = logger;