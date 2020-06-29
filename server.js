const mysql = require("mysql");
const main = require("./main");


const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "rootpassword",
    database: "management_db"
});

connection.connect(function(err) {
    if (err) throw err;
    //Start prompt function here
    main.runSearch();
});