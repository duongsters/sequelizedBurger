//----------Dependencies---------//
var express = require("express");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

//empowering handlebars as default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
var burgerRoutes = require("./controllers/burgers_controller.js");

app.use(burgerRoutes);


//--------------Listenng PORT---------------------------------//
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
