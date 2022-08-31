const mysql = require("mysql");
const database = {
    createDatabase: 'CREATE DATABASE IF NOT EXISTS NETFLIXusers',
    useDatabase: 'USE NETFLIXusers',
    createTable: 'CREATE TABLE IF NOT EXISTS signups(user_id INT AUTO_INCREMENT PRIMARY KEY, user_name varchar(255) NOT NULL, user_password varchar(255) NOT NULL, user_email varchar(255) NOT NULL, create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
};


    

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'NETFLIXusers'
});

module.exports = connection;