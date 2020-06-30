$(document).ready(function () {


    // function to clear the fields
    function clear() {
        $("#forecast").empty();
    }

    /**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */

    //WORKS
    function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
        //http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=b2d4239aa3e819b8680cdea4c57fe90d
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        queryURL.q = $("#searchText");

        var queryText = $("#searchText")
            .val().trim();

        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(queryURL + "q=" + queryText + "&" + $.param(queryParams));
        return queryURL + "q=" + queryText + "&units=imperial&"  + $.param(queryParams);

    }

    //WORKS paritally
    // works on click but not on return or enter.
    //searchs the city typed in the box by pressing enter
    $("#searchText").on("click", function (event) {
        // This line allows us to take advantage of the HTML "submit" property
        console.log(event);
        //prevents reloading of page by pressing enter
        event.preventDefault();

        // clear the forecast area to populate a new one
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
    //create dynamic divs to hold data
    function updatePage(OpenWeatherData) {
        // Log the openweatherdata to console, where it will show up as an object
        console.log(OpenWeatherData);
        console.log("------------------------------------");

        //create the forecast div here
        var cityName = OpenWeatherData.name; 
        //time variables
        var currentDate = OpenWeatherData.date;
        var dt = OpenWeatherData.dt;
        var formattedTime = 0;
        //weather icon
        var weatherIcon = OpenWeatherData.weather[0].icon;
        var weatherDescription = OpenWeatherData.weather[0].description;
        var temperature = OpenWeatherData.main.temp;
        var humidity = OpenWeatherData.main.humidity;
        var windSpeed = OpenWeatherData.wind.speed;
        var uvIndex = OpenWeatherData; //TODO
        
        
        //test console
        console.log(OpenWeatherData.name); //works
        console.log(iconUrl);
        console.log(weatherDescription);

        //get time from object, currently not in use
        getTime(dt);

        //update the time 
        var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        $("#forecast").append(currentTime)
        //append city name to header
        $("#forecast").append("<h2>" + cityName + "</h2>"); //works

        // create icon img tag and link with icon from object
        var icon = $("<img>");//create icon var
        var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        icon.attr("src", iconUrl); //set src attribute for icon
        $("#forecast").append("<p>Conditions: " + weatherDescription + "</p>");
        $("#forecast").append(icon);

        $("#forecast").append("<p>Temperature: " + temperature + "</p>");
        $("#forecast").append("<p>Humidity: " + humidity + "</p>");
        $("#forecast").append("<p>Windspeed: " + windSpeed + "</p>");


        //$("#forecast").attr('src', iconUrl);


        // ## append variables to the tRow element.then call this element to append to page
        // tRow.append(title,year,response.Title));





    }

    //convert time from unix format to regular
    function getTime(time) {

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(time * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        console.log(formattedTime);

    }

    //UNTESTED
    //  .on("click") function associated with the clear button
    $("#forecast").on("click", clear);

});