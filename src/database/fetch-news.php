<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include('db.php');

try {
    $query = "SELECT title, image_url, `description`, tag, creation_date FROM News";
    $stmt = $conn->query($query);
    $newsItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($newsItems);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch news: ' . $e->getMessage()]);
}
?>
