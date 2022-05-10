require('dotenv').config();
const mysql = require('mysql');

const connect = mysql.createConnection({
     host: process.env.DATABASE_HOST,
     port: process.env.DATABASE_PORT,
     user: process.env.DATABASE_USER,
     password: process.env.DATABASE_PASS,
     database: process.env.DATABASE_NAME,
});

setInterval(()=>{
     connect.query('SELECT version()');
},10000);

module.exports = connect;