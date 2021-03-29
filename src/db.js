const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1&",
    database: "twitter"
});

db.connect((error) => {
    if (error) throw error;
    console.log("Connection to database works");
});

module.exports = db;