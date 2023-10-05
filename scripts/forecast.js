import { API_KEY } from "./coordinates.js";
import { capitalizeWords } from "./other.js";

export async function fetchWeatherData(latitude, longitude) {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const tableBody = document.getElementById("weather-data");

    tableBody.innerHTML = "";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Assuming the API provides data for 5-day intervals
        const weatherData = data.list.filter((item, index) => index % 8 === 0);
        var i = 1;
        for (const item of weatherData) {
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i}</td>
                <td><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon"></td>
                <td>${item.main.temp}</td>
                <td>${capitalizeWords(item.weather[0].description)}</td>
                <td>${item.wind.speed}</td>
                <td>${item.main.humidity}</td>
                <td>${item.visibility}</td>
                <td>${item.main.pressure}</td>
                <td>${item.clouds.all}</td>
            `;

            tableBody.appendChild(row);
            i++;
        }

        i = 1;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}