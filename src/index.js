function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    let date = new Date(response.data.time * 1000);

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="${response.data.condition.description}" />`;

    getForecast(response.data.city); // Correct function name
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "1f1767o48c592t883414d34c98adb09b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(refreshWeather)
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Sorry, we couldn't retrieve the weather data. Please try again.");
        });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    if (searchInput.value.trim()) {
        searchCity(searchInput.value.trim());
    } else {
        alert("Please enter a valid city.");
    }
}

function getForecast(city) {
    let apiKey = "1f1767o48c592t883414d34c98adb09b";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = ""; // Ensure consistent variable name

    response.data.daily.forEach(function (day, index) {
        if (index < 5) { // Display up to 7 days
            forecastHtml += `
                <div class="weather-forecast-item">
                    <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt="${day.condition.description}" />
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>
            `;
        }
    });

    forecastElement.innerHTML = forecastHtml; // Set HTML content
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city weather
searchCity("Sydney");





