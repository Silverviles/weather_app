<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Step 1: Connect to your database (replace with your database credentials)
$servername = "localhost"; // default name = 'localhost'
$username = "root"; // default username = 'root'
$password = ""; // default password = ''
$dbname = "bawwa"; // add your database name here

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Step 2: Retrieve data from the "subscribers" table
    $sql = "SELECT city, email FROM subscribers";
    $stmt = $conn->query($sql);
    $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Step 3: Use the city name to generate latitude and longitude
    foreach ($subscribers as $subscriber) {
        $city = $subscriber['city'];
        $apiKey = 'c3710067bcc54ba34326e589bb751e30'; // Replace with your OpenWeather API key
        $geoApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey";

        $geoResponse = file_get_contents($geoApiUrl);
        $geoData = json_decode($geoResponse, true);

        if ($geoData && isset($geoData['coord']['lat']) && isset($geoData['coord']['lon'])) {
            $latitude = $geoData['coord']['lat'];
            $longitude = $geoData['coord']['lon'];

            $API_KEY = 'c3710067bcc54ba34326e589bb751e30'; // Replace with your OpenWeatherMap API key

            $API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=$latitude&lon=$longitude&appid=$API_KEY&units=metric";

            // Initialize variables to store the weather data
            $days = [];
            $temperatures = [];
            $descriptions = [];
            $windSpeeds = [];
            $humidities = [];
            $visibilities = [];
            $pressures = [];
            $cloudiness = [];

            // Create a new PHPMailer instance
            $mail = new PHPMailer(true);

            try {
                // Server settings for Gmail
                $mail->SMTPDebug = SMTP::DEBUG_OFF; // Set to SMTP::DEBUG_SERVER for debugging
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'your_email'; // Replace with your Gmail address
                $mail->Password = 'your_password'; // Replace with your Gmail password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port = 465;

                // Sender info
                $mail->setFrom('your_email', 'your_name'); // Replace with your email and name

                // Recipient
                $to = $subscriber['email'];
                $mail->addAddress($to, 'Subscriber'); // Replace with recipient's email and name

                // Email content
                $subject = "Weather Update for $city";
                $message = "Latitude: $latitude, Longitude: $longitude\n";
                $message .= "Day\tTemperature (°C)\tDescription\tWind Speed (m/s)\tHumidity (%)\tVisibility (m)\tPressure (hPa)\tCloudiness (%)\n";

                for ($i = 0; $i < count($days); $i++) {
                    $message .= "$days[$i]\t$temperatures[$i]\t$descriptions[$i]\t$windSpeeds[$i]\t$humidities[$i]\t$visibilities[$i]\t$pressures[$i]\t$cloudiness[$i]\n";
                }

                $mail->Subject = $subject;
                $mail->Body = $message;

                // Send the email
                $mail->send();

                echo "Email sent to: $to<br>";
            } catch (Exception $e) {
                echo "Email could not be sent. Mailer Error: {$mail->ErrorInfo}<br>";
            }
        } else {
            echo "Unable to fetch coordinates for $city<br>";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>
