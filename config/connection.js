// -----Set up MySQL connection-----
var mysql = require('mysql');
var connection;
//connection to burger_db database to heroku
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}

//else, connect to the mysql localhost:8080
else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "burgers_db"

    })
}


// Making connection --along with error repsonse possibly
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});



//Export connection for our ORM to use
module.exports = connection;