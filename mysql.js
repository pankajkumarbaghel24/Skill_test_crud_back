import mysql from "mysql2/promise";

export const db = await mysql.createConnection(process.env.MYSQL_URL);
console.log("✅ MySQL Connected");



// const mysql = require('mysql2');
// var config=require('config');

// var pool = mysql.createConnection({
//     host: config.get('db.host'),
//     user: config.get('db.user'),
//     port:config.get('db.port'),
//     password: config.get('db.password'),
//     database: config.get('db.database')
// });

// module.exports =pool.promise();
