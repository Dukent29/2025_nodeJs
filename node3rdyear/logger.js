const { path } = require('pdfkit');
const { createLogger, format, transports, level } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const simpleLogFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// const logger = createLogger({
//     level: 'info', // Default log level
//     format: format.combine(
//         format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }), // Custom timestamp format
//         logFormat
//     ),
//     transports: [
//         new transports.Console(),
//         new DailyRotateFile({
//             filename: './logs/%DATE%.log',
//             datePattern: 'DD-MM-YYYY',
//             maxSize: '20m',
//             maxFiles: '7d'
//         })
//     ]
// });
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
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure : process.env.EMAIL_SECURE  === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls : {
        rejectUnauthorized: false
    }
})
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