# Weather App

## Overview

The Weather App is a simple web application that provides weather details using the OpenWeatherMap API. It also offers the functionality to subscribe to weather updates via email using PHPMailer and PHP.

## Features

- **Weather Information**: Retrieve real-time weather information for any location using the OpenWeatherMap API.

- **Email Subscription**: Users can subscribe to receive weather updates via email for their chosen locations.

- **Email Notifications**: Automated email notifications with weather details are sent to subscribed users at regular intervals.

## Technologies Used

- JavaScript
- PHP
- PHPMailer
- OpenWeatherMap API

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/weather-app.git
   ```

2. Configure OpenWeatherMap API:
   
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api).
   - Replace `your-api-key` with your actual API key in the JavaScript file where API requests are made (`weather.js`).

3. Configure Email Settings:

   - Edit the PHP files responsible for sending emails (`send_weather_email.php`) and configure your email server settings and credentials.
   - Make sure to provide SMTP server details and email account information.

4. Deploy the application on a web server that supports PHP.

## Usage

1. Open the web application in your browser.

2. Enter the location for which you want to check the weather and click the "Get Weather" button.

3. To subscribe for weather updates via email:
   - Enter your email address.
   - Select the frequency of updates (e.g., daily, weekly).
   - Click the "Subscribe" button.

4. You will start receiving weather updates via email as per your selected frequency.

## Contributors

- [Silverviles](https://github.com/Silverviles)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- OpenWeatherMap for providing weather data through their API.
- PHPMailer for facilitating email communication.
- The open-source community for inspiration and support.

---

Please note that this README provides a high-level overview of the Weather App project. Detailed setup and usage instructions can be found in the project's source code.
