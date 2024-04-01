$(document).ready(function () {

    // //get default users location
    var location = navigator.geolocation.getCurrentPosition(success);
    console.log(location);

    //get geolocation and update page
    function success(pos) {
        const loc = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${loc.latitude}`);
        console.log(`Longitude: ${loc.longitude}`);
        console.log(`More or less ${loc.accuracy} meters.`);

        var queryURL = buildQueryURLPOS(loc.latitude,loc.longitude);
        
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
            // The data then gets passed as an argument to the updatePage function
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(updatePage);
    }

    // function to clear the fields
    function clear() {
        $("#forecast").empty();
        $("#weeklyForecast").empty();                           
        console.log('clearing fields')
    }



    /**
 * pulls information from the form and build the query URL
 * @returns {string} URL for weather API based on form inputs
 */

    //WORKS for any input of string data
    function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://corsproxy.io/?http://api.openweathermap.org/data/2.5/weather?";
        //https://corsproxy.io/?http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=b2d4239aa3e819b8680cdea4c57fe90d
        //http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=b2d4239aa3e819b8680cdea4c57fe90d
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        //queryURL.q = $("#searchText");

        //take the input of the search bar
        var queryText = $("#searchText")
            .val().trim();

        // put search history on side
        var listItem = $("<li>").addClass("list-group-item").text(queryText);
        $(".list-group").append(listItem);


        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(queryURL + "q=" + queryText + "&" + $.param(queryParams));
        return queryURL + "q=" + queryText + "&units=imperial&" + $.param(queryParams);
    }

    //builds a query url based off the lat and lon, used for users default location when script starts
    function buildQueryURLPOS(lat,lon){
        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        
        var queryURL = "https://corsproxy.io/?http://api.openweathermap.org/data/2.5/weather?";
        
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };
        console.log(queryURL + "lat=" + lat + "&" + "lon=" + lon + "&" + $.param(queryParams) + "&units=imperial" );
        return (queryURL + "lat=" + lat + "&" + "lon=" + lon + "&" + $.param(queryParams) + "&units=imperial");

    }


    //get the uv index value based off lat and lon of the city searched
    function buildQueryUVIndexURL(lat, lon) {
        // query is the url we'll use to query the API
        var queryUVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?";
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "appid": "b2d4239aa3e819b8680cdea4c57fe90d" };

        console.log(queryUVIndexURL + "lat=" + lat + "&" + "lon=" + lon + "&" + $.param(queryParams));
        return (queryUVIndexURL + "lat=" + lat + "&" + "lon=" + lon + "&" + $.param(queryParams));

    }

    //deprecated, deleted search button
    $("#search").on("click", ".fa-search", function (event) {
        // This line allows us to take advantage of the HTML "submit" property
        console.log(event);

        //prevents reloading of page by pressing enter
        event.preventDefault();

        // clear the forecast area to populate a new one
        clear();

        // Build the query URL for the ajax request to the Open weather API
        var queryURL = buildQueryURL();
        //var queryForecastURL = buildQueryForecastURL();

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);

    });

    //use the enter key to input event
    $("#searchText").on("keypress", function (event) {
        if (event.keyCode === 13) {

            // This line allows us to take advantage of the HTML "submit" property
            console.log(event);
            event.preventDefault();
            // clear the forecast area to populate a new one
            clear();

            // Build the query URL for the ajax request to the Open weather API
            var queryURL = buildQueryURL();
            //var queryForecastURL = buildQueryForecastURL();


            // Make the AJAX request to the API - GETs the JSON data at the queryURL.
            // The data then gets passed as an argument to the updatePage function
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(updatePage);

            //clear the search bar
            console.log("clearing search bar")
            // $("#searchText").empty();
            $("#searchText").val("");
        }
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
        var uvIndex;

        //clear the input field
        $("#searchText").empty();


        //test console
        console.log(OpenWeatherData.name); //works
        console.log(weatherDescription);
        console.log("UV DAta " + uvIndex);

        //update the time 
        var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a")
        //append city name to header
        $("#forecast").append("<h2>" + cityName + "</h2>", "<p>" + currentTime + "</p>"); //works
        $("#forecast").attr("style", "background-color: lightsteelblue;");
        // create icon img tag and link with icon from object
        var icon = $("<img>");//create icon var
        var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        icon.attr("src", iconUrl); //set src attribute for icon

        $("#forecast").append("<p>Conditions: " + weatherDescription + "</p>");
        $("#forecast").append(icon);

        $("#forecast").append("<p>Temperature: " + temperature + " °F</p>");
        $("#forecast").append("<p>Humidity: " + humidity + " %</p>");
        $("#forecast").append("<p>Windspeed: " + windSpeed + " mph</p>");
        // get UV index
        var uvIndexURL = buildQueryUVIndexURL(lat, lon);
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (UVdata) {
            console.log(UVdata);
            uvIndex = UVdata.value;
            var ptag = $("<p>").text("UV Index: ");
            var UVbutton = $("<span>").addClass("btn").text(uvIndex);
            if (uvIndex < 3) {
                UVbutton.addClass("btn-success")
            }
            else if (uvIndex < 7) {
                UVbutton.addClass("btn-warning");
            }

            else {
                UVbutton.addClass("btn-danger");
            }

            $("#forecast").append(ptag.append(UVbutton));
        });


        var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=b2d4239aa3e819b8680cdea4c57fe90d";
        console.log(queryForecastURL);


        //create the 5 day forecast
        //Works
        function forecast() {
            $.ajax({
                // url: "https://corsproxy.io/?'api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&units=imperial&cnt=5&appid=b2d4239aa3e819b8680cdea4c57fe90d",
                url: "https://corsproxy.io/?https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b2d4239aa3e819b8680cdea4c57fe90d",
                method: "GET"
            }).then(function (response) {
                // console.log the response
                console.log("5 day forecast ");
                console.log(response);

                console.log("resonse list");
                console.log(response.list);

                // append title weekly forecast
                var h3 = $("<h3>Weekly Forecast</h3>").addClass("row col-md-12");

                // change the bg color
                $("#weeklyForecast").append(h3);
                $("#weeklyForecast").attr("style", "background-color: lightsteelblue;")


                // run 5 times for forecast
                for (var i = 0; i < 5; i++) {

                    console.log("humidity = " + response.list[i].main.humidity);
                    var humidity = response.list[i].main.humidity
                    console.log("temp = " + response.list[i].main.temp);
                    var temp = response.list[i].main.temp;
                    console.log("date = " + response.list[i].dt);
                    var date = moment.unix(response.list[i].dt).format('YYYY-MM-DD');
                    var weatherIcon = response.list[i].weather[0].icon;
                    // console.log("humidity" + humidity);

                    // create icon img tag and link with icon from object
                    var icon = $("<img>");//create icon var
                    var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                    icon.attr("src", iconUrl); //set src attribute for icon
                    icon.attr("width", "50px");
                    icon.attr("height", "50px");

                    //create the cards that hold the daily forecasts
                    var card = $("<div>").addClass("card bg-primary text-white col-md-2");
                    var p1 = $("<p>").addClass("card-text").text(date);
                    var p2 = $("<p>").addClass("card-text").text("Temp: " + temp + " °F");
                    var p3 = $("<p>").addClass("card-text").text("Humidity: " + humidity + " %");
                    $("#weeklyForecast ").append(card.append(p1, icon, p2, p3));

                }
            });
        }

        forecast();
    }


    // when clicking search button, use clear function
    $("#search").on("click", clear);

});