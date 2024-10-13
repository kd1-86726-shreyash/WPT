// mysql2 -> moduleName
const mysql = require('mysql2')
 
//CoonectionPool Between database and application
// Requires in JDBC .NET REACT SPRING
// In node it is written in json Format and other technologies it is written in string format 
// Every request[get , request , put , delete] 
const pool = mysql.createPool({
    host: 'localhost',
    database: 'airbnb_db',
    port: 3306,
    user: 'KD1-86726-shreyash',
    password: 'manager',
    connectionLimit: 10, // Maximum 10 Concurrent Connections at a time 
})

module.exports = {
    pool,
}