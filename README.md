# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.


# software specifications
- must use form inputs
- searching for a city yields 
    - current and future conditions
- must maintain search history
- must display
    - city name
    - the date
    - icon representing weather conditions
    - current temperature
    - humidity
    - wind speed
    - UV index
- UV index must indicate with color a 3 stage scale, for favorable, moderate, and severe
- Future weather conditions must display
    - 5 day weather forecast that displays the date
    - an icon representing the weather condition
    - temperature
    - humidity
- user must be able to click on previous city in history and see the page. 

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)
