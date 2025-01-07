<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

try {
    // Modify the query to get distinct creation dates
    $stmt = $conn->query("SELECT DISTINCT DATE(creation_date) AS news_date FROM News");
    $dates = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Extract only the date values and return them
    $datesArray = array_map(function ($item) {
        return $item['news_date'];
    }, $dates);

    echo json_encode(['status' => 'success', 'data' => $datesArray]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
