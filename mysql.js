// import mysql from "mysql2/promise";

// export const db = await mysql.createConnection(process.env.MYSQL_URL);
// console.log("✅ MySQL Connected");


require("dotenv").config();
const mysql = require('mysql2');
var config=require('config');

var URL=process.env.MYSQL_URL;

var pool=mysql.createConnection(URL);
// var pool = mysql.createConnection({
//     host: config.get('db.host'),
//     user: config.get('db.user'),
//     port:config.get('db.port'),
//     password: config.get('db.password'),
//     database: config.get('db.database')
// });

module.exports =pool.promise();

// MONGO_URL=mongodb+srv://pb416159:Pankaj*24>@uniconnectnms.fadvayz.mongodb.net/?retryWrites=true&w=majority&appName=UniConnectNMS
// PORT=3000
// MYSQL_URL=mysql://root:PwgABCunacSBmOIFqxlVgWokioxGVCag@caboose.proxy.rlwy.net:54264/railway
