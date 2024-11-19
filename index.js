function refreshWeather(currentweather) {
    // document.write(currentweather.data.temperature.current) 
    // let currentTemperature = Math.round(currentweather.data.temperature.current);  
    // document.write(currentTemperature);  

    // Display the temperature 
    let currentTemperatureValue = document.querySelector("#current-temperature-value");
    currentTemperatureValue.innerHTML = Math.round(currentweather.data.temperature.current);

    // Display the weather description 
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = currentweather.data.condition.description;

    let currentWeatherIcon = document.querySelector("#weather-app-icon");
    currentWeatherIcon.innerHTML = `
        <img  
        src="${currentweather.data.condition.icon_url}" 
        alt="not loading" 
        class="weather-app-icon"  
        />`;

    console.log(currentweather.data);

    // Display the humidity  
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${currentweather.data.temperature.humidity}%`;

    // Display the wind speed  
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = `${currentweather.data.wind.speed} knots`;

    // Display day and time  
    let currentTime = document.querySelector("#current-time");
    let date = new Date(currentweather.data.time * 1000);
    currentTime.innerHTML = formatDate(date);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(currentCityName) {
    let apiKey = "73dof19a030ad06t05b21e8521b4860f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCityName}&key=${apiKey}`;
    // console.log(currentCityName); 
    axios.get(apiUrl).then(refreshWeather);
    // console.log(apiUrl);  
}

function displayCity(event) {
    event.preventDefault();

    let cityName = document.querySelector("#city-name");
    let cityNameDisplayed = document.querySelector("h3");
    cityNameDisplayed.innerHTML = cityName.value;
    currentCityName = cityName.value;
    searchCity(currentCityName);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
