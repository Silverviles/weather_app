<?php
// Step 1: Establish a database connection (replace with your own database credentials)
$servername = "localhost"; // default name = 'localhost'
$username = "root"; // default username = 'root'
$password = ""; // default password = ''
$dbname = "bawwa"; // add your database name here

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Check if the 'subscribers' table exists. If not, create it.
$tableExists = $conn->query("SHOW TABLES LIKE 'subscribers'")->num_rows > 0;

if (!$tableExists) {
    $createTableSQL = "CREATE TABLE subscribers (
        subNo INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )";

    if ($conn->query($createTableSQL) === TRUE) {
        echo "Table 'subscribers' created successfully.";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}

$email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
$city = htmlspecialchars($_POST['city'], ENT_QUOTES, 'UTF-8');

// Step 4: Insert the data into the 'subscribers' table
$insertSQL = "INSERT INTO subscribers (city, email) VALUES (?, ?)";
$stmt = $conn->prepare($insertSQL);
$stmt->bind_param("ss", $city, $email);

if ($stmt->execute()) {
    echo "Subscription successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the database connection
$stmt->close();
$conn->close();
?>
