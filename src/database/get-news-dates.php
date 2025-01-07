<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include the database connection
include 'db.php';

// Get the selected date from the query parameter
$date = isset($_GET['date']) ? $_GET['date'] : '';

// Check if the date is provided
if ($date) {
    try {
        // Prepare SQL query to fetch news for the selected date
        $query = "SELECT * FROM News WHERE DATE(creation_date) = :date";
        $stmt = $conn->prepare($query);  // Use $conn instead of $pdo
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        // Fetch all results
        $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return news data as JSON
        echo json_encode($news);
    } catch (PDOException $e) {
        // Handle any database connection errors
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Date parameter is missing.']);
}
?>