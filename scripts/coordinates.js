export const API_KEY = "c3710067bcc54ba34326e589bb751e30"; // openweathermap access key

// Function to get the coordinates according to the user entered city name
export async function getCoordinates(cityName) {
    const API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    try {
        const response = await fetch(API_GEO_URL);

        if (!response.ok) {
            throw new Error('Error receiving geo coordinates.');
        }

        const data = await response.json();

        if (data.length === 0) {
            throw new Error('City not found.');
        }

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        return [cityName, latitude, longitude];
    } catch (error) {
        throw new Error(error);
    }
}

// Function to get the coordinates of the current location
export function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById("weather").style.display = "block";
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                callback({ latitude, longitude });
            },
            (error) => {
                console.log("Error getting geolocation:", error.message);
                callback(null, error);
            }
        );
    } else {
        callback(null, new Error("Geolocation is not supported by this browser."));
    }
}