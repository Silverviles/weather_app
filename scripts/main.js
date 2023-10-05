import {getCurrentLocation, getCoordinates} from './coordinates.js';
import {onLoad} from './onLoad.js';
import { displayCityImage } from './processImage.js';
import { fetchWeatherData } from './forecast.js';

window.onload = function() {
    getCurrentLocation((location, error) => {
        if (error) {
            console.error(error);
        } else {
            onLoad(location.latitude, location.longitude);
        }
    });
};

const searchButtonElement = document.getElementById("search-btn");
searchButtonElement.addEventListener("click", () => {
    const cityInput = document.getElementById("city-input");
    const cityName = cityInput.value;

    const coordinates = getCoordinates(cityName);
    coordinates.then(([cityName, latitude, longitude]) => {
        onLoad(latitude, longitude, 'search-');
        document.getElementById("entered-location").innerHTML = cityName;
        document.getElementById("search-weather").style.display = "flex";
        displayCityImage(cityName);
        fetchWeatherData(latitude, longitude);

        const forecastElement = document.getElementById("weather-forecast");
        if(forecastElement.style.display === "none"){
            forecastElement.style.display = "block";
        }
    }).catch(error => {
        alert("An error occurred while fetching coordinates: " + error.message);
    });
});

// JavaScript for opening and closing the popup
const openPopupButton = document.getElementById('subscribe-btn');
const closePopupButton = document.getElementById('closePopupButton');
const popupContainer = document.getElementById('popupContainer');

openPopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'none';
});

// JavaScript to close the popup after form submission
const subscribeForm = document.getElementById('subscribe-form');

subscribeForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

    // Get form data
    const formData = new FormData(subscribeForm);

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the request method, URL, and set it to asynchronous
    xhr.open('POST', 'http://localhost/subscribe.php', true);

    // Set up the event listener for when the request is complete
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request was successful
            console.log(xhr.responseText); // You can handle the response here if needed
            location.reload();
        } else {
            // Request encountered an error
            console.error('Request error:', xhr.status);
        }
    };

    // Send the form data
    xhr.send(formData);
});