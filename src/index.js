function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);

}


function searchCity(city) {
    let apiKey = "1f1767o48c592t883414d34c98adb09b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);

}




function handleSearchSubmit(event) {
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("Sydney");

