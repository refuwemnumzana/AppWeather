function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
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
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="${response.data.condition.description}" />`;
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "1f1767o48c592t883414d34c98adb09b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
   
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = ""; // Ensure consistent variable name

  days.forEach(function (day) {
    forecastHtml += `
      <div class="weather-forecast-item">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>15°</strong></div>
          <div class="weather-forecast-temperature">9°</div>
        </div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml; // Set HTML content
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city weather
searchCity("Sydney");
displayForecast();



