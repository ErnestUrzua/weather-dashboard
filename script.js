$(document).ready(function () {

    // function to clear the fields
    function clear() {
        $("#article-section").empty();
    }

    
    function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var query = { "api-key": "b2d4239aa3e819b8680cdea4c57fe90d" };
    }


    $("#run-search").on("click", function (event) {
        // This line allows us to take advantage of the HTML "submit" property

        //prevents reloading of page by pressing enter
        event.preventDefault();

        // clear the forecast area
        clear();

        // Build the query URL for the ajax request to the Open weather API
        var queryURL = buildQueryURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    });

    //  .on("click") function associated with the clear button
    $("#clear-all").on("click", clear);

});