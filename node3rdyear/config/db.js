const mysql = require('mysql');
const config = require('db.config.js');

const connection = mysql.createConnection({ 
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB
});
connection.connect(error => {
    if (error) throw error;
    console.log('je suis connecté à la base de données mysql');
});

module.exports = connection;