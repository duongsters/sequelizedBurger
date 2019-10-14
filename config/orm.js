// imports MySQL connection call set within variable 'connection.js' file
var connection = require("../config/connection.js");

// helper function for SQL syntax
//... the helper function loops through and creates an array of question marks - and turns it into a string.
function printQuestionMarks(num) {
    var arr = [];
    for (var j = 0; j < num; j++) {
        arr.push("?");
    }
    return arr.toString();
}

// 'objToSql', a helper function, that runs to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, then add quotations 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // returns array of strings to a single comma-separated string
    return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
    // callback function 'selectAll' runs by takes in all values from tableInput from burgers_db database and selects all values 'burgers' table
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // 'insertOne' callback function runs by inserting a new burger to the 'burgers' table
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    // 'updateOne' callback function runs by updating a burger from the devoured and un-devoured lists from the 'burgers' table 
    //by changing the values of coloumn values and boolean values of 'devoured'
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });

    },


    // 'updateOne' callback function runs by deleting a burger from the 'burgers' table
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

// Export the orm object for the model (burgers.js).
module.exports = orm;