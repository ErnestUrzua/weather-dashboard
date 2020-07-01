$(document).ready(function () {

    // function to clear the fields
    function clear() {
        $("#forecast").empty();
    }

    /**
 * pulls information from the form and build the query URL
 * @returns {string} URL for weather API based on form inputs
 */

    //WORKS
    function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
        //http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=b2d4239aa3e819b8680cdea4c57fe90d
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        //queryURL.q = $("#searchText");

        var queryText = $("#searchText")
            .val().trim();

        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(queryURL + "q=" + queryText + "&" + $.param(queryParams));
        return queryURL + "q=" + queryText + "&units=imperial&" + $.param(queryParams);
    }

    //not working
    function buildQueryForecastURL() {
        // query is the url we'll use to query the API
        var queryForecastURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?";
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        //queryURL.q = $("#searchText");

        var queryText = $("#searchText")
            .val().trim();

        // Logging the URL so we have access to it for troubleshooting
        console.log(queryForecastURL + "q=" + queryText + "&units=imperial&cnt=5&" + $.param(queryParams));
        return queryForecastURL + "q=" + queryText + "&units=imperial&cnt=5&" + $.param(queryParams);
    }

    //WORKS paritally
    // works on click but not on return or enter.
    //searchs the city typed in the box by pressing enter
    $("#search").on("click", ".fa-search", function (event) {
        // This line allows us to take advantage of the HTML "submit" property
        console.log(event);
        //prevents reloading of page by pressing enter
        event.preventDefault();

        // clear the forecast area to populate a new one
        clear();

        // Build the query URL for the ajax request to the Open weather API
        var queryURL = buildQueryURL();
        var queryForecastURL = buildQueryForecastURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);

        // $.ajax({
        //     url: queryForecastURL,
        //     method: "GET"
        // }).then(updatePage);



    });


    /**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} OpenWeatherData - object containing weather API data
 * @param {object} FiveDayForecastData -object containg forecast
 */
    //create dynamic divs to hold data
    function updatePage(OpenWeatherData) {
        // Log the openweatherdata to console, where it will show up as an object

        console.log(OpenWeatherData);
        console.log("------------------------------------");
        //console.log(FiveDayForecastData);
        console.log("------------------------------------");

        //create the forecast div here
        var cityName = OpenWeatherData.name;
        //time variables
        var currentDate = new Date(OpenWeatherData.dt).toLocaleDateString();

        console.log(currentDate);


        //location data
        var lat = OpenWeatherData.coord.lat;
        var lon = OpenWeatherData.coord.lon;

        //weather icon
        var weatherIcon = OpenWeatherData.weather[0].icon;
        var weatherDescription = OpenWeatherData.weather[0].description;
        var temperature = OpenWeatherData.main.temp;
        var humidity = OpenWeatherData.main.humidity;
        var windSpeed = OpenWeatherData.wind.speed;
        // var uvIndex = OpenWeatherData; //TODO



        //test console
        console.log(OpenWeatherData.name); //works
        console.log(weatherDescription);
        //get UV index
        // var uvIndexURL = buildQueryUVIndex(lat, lon);
        // $.ajax({
        //     url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?&" + "lat=" + lat + "&" + "lon=" + lon + "&appid=b2d4239aa3e819b8680cdea4c57fe90d",
        //     method: "GET"
        // })

        //update the time 
        var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a")
        //append city name to header
        $("#forecast").append("<h2>" + cityName + "</h2>", "<p>" + currentTime + "</p>"); //works

        // create icon img tag and link with icon from object
        var icon = $("<img>");//create icon var
        var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        icon.attr("src", iconUrl); //set src attribute for icon
        $("#forecast").append("<p>Conditions: " + weatherDescription + "</p>");
        $("#forecast").append(icon);

        $("#forecast").append("<p>Temperature: " + temperature + "</p>");
        $("#forecast").append("<p>Humidity: " + humidity + "</p>");
        $("#forecast").append("<p>Windspeed: " + windSpeed + "</p>");
        //$("#forecast").append("<p>UV Index: " + buildQueryUVIndex(lat, lon) + "</p>");

        var queryForecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=b2d4239aa3e819b8680cdea4c57fe90d";
        console.log(queryForecastURL);
        //create the 5 day forecast

        function forecast() {
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=b2d4239aa3e819b8680cdea4c57fe90d",
                method: "GET"
            }).then(function (response) {
                // console.log the response
                console.log("5 day forecast ");
                console.log(response);

                console.log(response.daily);

                // append title weekly forecast
                var h3 = $("<span><h3>Weekly Forecast</h3></span>").addClass("row col-md-8");

                $("#weeklyForecast").append(h3);

                response.daily.forEach(element => {
                    console.log(element);
                    var humidity = element.humidity
                    var temp = element.temp.day;
                    var date = new Date(element.dt).toLocaleDateString();
                    var weatherIcon = element.weather[0].icon;
                    console.log("humidity" + humidity);
                    // create icon img tag and link with icon from object
                    var icon = $("<img>");//create icon var
                    var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                    icon.attr("src", iconUrl); //set src attribute for icon


                    var card = $("<div>").addClass("card bg-primary text-white col-md-2");
                    var p1 = $("<p>").addClass("card-text").text(date);
                    var p2 = $("<p>").addClass("card-text").text("Temp: " + temp + " °F");
                    var p3 = $("<p>").addClass("card-text").text("Humidity: " + humidity + " %");

                    $("#weeklyForecast ").append(card.append(p1, icon, p2, p3));


                });

            });
        }

        forecast();
    }




    //UNTESTED
    //  .on("click") function associated with the clear button
    $("#forecast").on("click", clear);

});