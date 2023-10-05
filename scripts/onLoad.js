import { API_KEY } from './coordinates.js';
import { getCurrentTime } from './other.js';
import { capitalizeWords } from './other.js';

export async function onLoad(latitude, longitude, prefixString = ''){
    try {
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const weatherResponse = await fetch(API_WEATHER_URL);

        if (!weatherResponse.ok) {
            throw new Error('Error receiving weather data.');
        }

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.main.temp;
        const weather_image = weatherData.weather[0].icon;
        const windContent = weatherData.wind.speed;
        const humidityContent = weatherData.main.humidity;
        const visibilityContent = weatherData.visibility;
        const pressureContent = weatherData.main.pressure;
        const cloundsContent = weatherData.clouds.all;
        const weatherDesContent = weatherData.weather[0].description;
        const feelsLikeContent = weatherData.main.feels_like;

        // Set the image source, weather name, and weather description
        const timeElement = document.getElementById("time");
        timeElement.innerHTML = "Current Time: " + getCurrentTime();

        const weatherImageElement = document.getElementById(prefixString + 'weather-image');
        weatherImageElement.src = `https://openweathermap.org/img/wn/${weather_image ? weather_image : '01d'}.png`;

        const weatherTempElement = document.getElementById(prefixString + 'weather-temp');
        weatherTempElement.innerHTML = temperature.toFixed(1) + " &degC";

        const weatherWindElement = document.getElementById(prefixString + 'weather-wind');
        weatherWindElement.innerText = "Wind Speed\n" + windContent + "m/s"; 

        const weatherHumidityElement = document.getElementById(prefixString + 'weather-humidity');
        weatherHumidityElement.innerText = "Humidity\n" + humidityContent + "%"; 

        const weatherVisibilityElement = document.getElementById(prefixString + 'weather-visibility');
        weatherVisibilityElement.innerText = "Visibility\n" + visibilityContent + "m"; 

        const weatherPressureElement = document.getElementById(prefixString + 'weather-pressure');
        weatherPressureElement.innerText = "Atmospheric Pressure\n" + pressureContent + " hPa"; 

        const weatherCloudElement = document.getElementById(prefixString + 'weather-cloudiness');
        weatherCloudElement.innerText = "Cloudiness\n" + cloundsContent + "%"; 

        const weatherDesElement = document.getElementById(prefixString + 'weather-des');
        weatherDesElement.innerText = capitalizeWords(weatherDesContent);

        const feelsLikeElement = document.getElementById(prefixString + "weather-feel-like");
        feelsLikeElement.innerText = "Feels like " + feelsLikeContent.toFixed(1) + " °C";

    } catch (error) {
        alert("An error occurred while fetching the weather forecast: " + error.message);
    }
}