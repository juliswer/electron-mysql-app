const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

function getConnection() {
    return connection;
}

module.exports = {getConnection}