// Import the 'orm' variable to create functions that will interact with the database (orm.js file)
var orm = require("../config/orm.js");

var burger = {
    //reads the 'burgers' table and gets back of the records of burgers
    //cb parameter valus is leading to the callback function on burgers_controller.js line 11-19
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },


    //reads the 'burgers' table and gets back of the updated records of the burgers
    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },

    //updates the 'burgers' devoured boolean valuetable and gets back of the updated records of the burgers table
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        });
    },

    //delets the burgers from the 'burgers' table and gets back of the updated records of the burgers table
    delete: function (condition, cb) {
        orm.delete("burgers", condition, function (res) {
            cb(res);
        });
    }

};


// exports the database functions result values for the controller file burgers_controller.js
module.exports = burger;
