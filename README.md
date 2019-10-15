# Assignment: Burger-Mania Part 2: The SEQUELized Version


![Screenshot1](./public/assets/img/Screenshot.gif)
## Summary:
Similar to Burger-Mania, Burger-Mania Part 2 Sequelized, in the UX perspective, nothing will have changed at all. However the biggest difference is what is happening under the hood on the UI-end. I deleted the ORM method and files throughout the entire application and rendered an apiRoutes.js file that would replace the burgers_controller.js file used within Burger-Mania. The connection to the burgers database is slightly changed a bit as well as I removed the connection.js file and replaced that with a sequelized running config.json file that would connect to the JAWSDB to my burgers database table. Outside of those major changes, this Burger-Mania Part 2 should be just the same as Burger-Mania
Burger-Mania, a burger-themed application that renders the situational case where the user could: 1) Choose a burger from an already pre-set choice of 6 burgers I created as samples and 2) Personally add a burger of their choice and have it  added to the ‘burgers’ table database, just like ordering your burger/food through an online application we are used to seeing these days! Burger-Mania was created using basic javascript on node and express, with a SQL database. Express handlebars was also used. Burger-Mania, will allow the user to “devour” (aka “eat”) or “un-devour” the list of displayed burgers by clicking either of the two buttons. Similar to the likely scenario of actually eating a burger, “Burger-Mania” would update the status of the burger being eaten or not by dynamically changing it’s values between the burgers table. The burgers table, located within the “burgers_db” SQL database, will allow the user to view the burgers devoured/eaten within in the top  table displayed within the top webpage, and “un-devoured burgers” list displayed just below the “devoured”.  Once a burger is devoured, just like throwing away your trash of the meal, the user will be able to click on the delete button whenever they plan on removing any burgers from the list whenever they want. Under the "Add a Burger" portion, the user could uniquely add a burger of their choice by entering the name of the new burger or simply reorder a deleted burger from the list by pressing the submit button below the form would dynamically add the burger to list...

Simply put, Burger-Mania will allow users to (in no specific order):


1) Submit a personal burger to the app![Screenshot1](./public/assets/img/Screenshot1.png)
2) Eat a burger within the app![Screenshot1](./public/assets/img/Screenshot2.png)
3) Re-order a previously deleted burger
4) Delete a burger from the list provided![Screenshot1](./public/assets/img/Screenshot3.png)
 


## Getting Started:
The simpliest way in seeing a demo of Burger Mania is to click on the Heroku link (https://hidden-mountain-42182.herokuapp.com/) that leads it directly to the project without any installations required. This link can be found within this readme file or at the description area within http://github.com/duongsters/burger

To connect locally...
1) Clone burger repository via https://github.com/duongsters/sequelizedBurger
2) Run command line Terminal (or via Gitbash) 'npm install' for required NPMS used within the application
3) Run command line 'node server.js' to start up the application
4) Once connected to http://localhost:8080/ from CLI, copy that exact link to URL
5) Run 'ctrl + c' within the CLI to exit the application entirely

## Technologies Used:
- NPM: I used specifically the Express-Handlebars, mySQL, Express throughout the entire assigment.
- Node.JS: Basically the engine that runs the NPM packages used as stated above.
- Javascript: Basically used within the main files to render the entire application


## Code Snippet(s)
via apiRoutes.js:
* This specific of code within my apiRoutes.js file shows 2 functions ...the top functions runs to POST a burger to the list from the root route and the app.delete function deletes a burger from the burgers table via the user ID route
```javascript
    app.post("/", function (req, res) {
        db.burgers.create({
            burger_name: req.body.name
        }).then(function () {
            res.redirect("/");
        });
    });

    app.delete("/:id", function (req, res) {
        db.burgers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.redirect("/");
        });
    });

```


via server.js :
* This specific portion within my server.js file will be showing the changes I needed to make with the use of sequelize within this file...first by assigning the 'db' variable be set to location of models folder, then requiring the use of the apiRoutes.js folder, and finally changing the listening PORT function
```javascript
var db = require("./models");

require("./routes/apiRoutes")(app);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

```

via burger.js:
* I removed everything from my model burger.js file as it was previously ran entirely on ORM callbacks. This new revised sequalized version of my model burger.js file has much less coding that goes straight to the point in having the function run to change the burger name and the devoured status from being eaten or not

```javascript
module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("burgers", {
        burger_name: {
            // Giving the burger_name model to a name with a type STRING
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            // Giving the devoured model to value of a type BOOLEAN then setting that to false
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, 
        {
        timestamps: false
    }
);
    return Burger;
};
```




## Author Links:
[GitHub](https://github.com/duongsters)
[LinkIn](https://www.linkedin.com/in/theandrewduong/)