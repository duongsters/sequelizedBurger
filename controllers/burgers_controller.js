//--express connection
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");


// Created all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function (data) {
        var hBarObject = {
            burgers: data
        };
        console.log(hBarObject);
        res.render("index", hBarObject);
    });
});

//.post express call method in posting new burgers to the db
router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ],
        [req.body.burger_name, req.body.devoured],
        function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId })
        });
});

//.put express call method in updating the burger db
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
console.log(condition);
    burger.updateOne({
        devoured: req.body.devoured
    },
        condition, function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            }
            else {
                res.status(200).end();
            }
        });
});

//.delete express call method in deleting a burger from the db
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});



// Export routes for server.js to use.
module.exports = router;