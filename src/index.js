function refreshWeather(response) {
    // Get temperature element and update it with the current temperature
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current); // Ensure temperature is rounded
    
    let humidityElement = document.querySelector("humidity");
    humidityElement.innerHTML = response.data.temperature.humidity
    
    
    // Get city element and update it with the city name
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    // Additional weather info can be added here (e.g., description, humidity)
    let descriptionElement = document.querySelector("#description");
    if (descriptionElement) {
        descriptionElement.innerHTML = response.data.condition.description;
    }
}

function searchCity(city) {
    // API Key and URL
    let apiKey = "1f1767o48c592t883414d34c98adb09b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    // Make the API call
    axios.get(apiUrl)
        .then(refreshWeather)
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Sorry, we couldn't retrieve the weather data. Please try again.");
        });
}

function handleSearchSubmit(event) {
    // Prevent the form from reloading the page
    event.preventDefault();
    
    // Get the search input value and pass it to the searchCity function
    let searchInput = document.querySelector("#search-form-input");
    if (searchInput.value.trim()) {
        searchCity(searchInput.value.trim());
    } else {
        alert("Please enter a valid city.");
    }
}

// Attach the event listener to the form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Search for a default city on page load
searchCity("Sydney");
