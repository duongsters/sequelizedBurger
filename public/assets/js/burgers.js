// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function(){

    // onclick call reading on the 'devour' & 'un-devour' button on adding a burger to the list
    $(".change-devoured").on("click", function (event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };
        console.log(newDevouredState);
        
        // Send the html PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        })
            .then(
                function () {
                    console.log("changed devoured to", newDevoured);
                    location.reload();
                }
            );
    });

    // onclick call reading on the submit button on adding a burger to the list
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bu").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        })
            .then(
                function () {
                    console.log("created new burger");
                    location.reload();
                }
            );
    });

    // onclick call reading on the delete button on adding a burger to the list
    $(".delete-burger").on("click", function (event) {
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        })
            .then(
                function () {
                    console.log("deleted burger", id);
                    location.reload();
                }
            );
    });

});