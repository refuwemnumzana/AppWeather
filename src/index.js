function handleSearchSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value; // Update the city element with the search input value
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); // Corrected typo

