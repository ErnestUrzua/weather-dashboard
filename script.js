$(document).ready(function () {

    // function to clear the fields
    function clear() {
        $("#forecast").empty();
    }

    /**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
    function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "api.openweathermap.org/data/2.5/weather?";
        //http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=b2d4239aa3e819b8680cdea4c57fe90d
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        queryParams.q = $("#search")
            .val()
            .trim();

        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(queryURL + $.param(queryParams));
        return queryURL + $.param(queryParams);

    }


    $("#search").on("click", function (event) {
        // This line allows us to take advantage of the HTML "submit" property
        console.log(event);
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


    /**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} OpenWeatherData - object containing NYT API data
 */
    function updatePage() {
        // Log the openweatherdata to console, where it will show up as an object
  console.log(OpenWeatherData);
  console.log("------------------------------------");
    }

    //  .on("click") function associated with the clear button
    $("#forecast").on("click", clear);

});