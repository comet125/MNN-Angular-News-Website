<?php
// Include the database connection
require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle PUT request
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'], $data['field'], $data['value'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
        exit;
    }

    $id = (int)$data['id'];
    $field = trim($data['field']);
    $value = trim($data['value']);
    $updateTag = isset($data['updateTag']) ? (bool)$data['updateTag'] : false;

    // Ensure field exists in the table and sanitize
    $allowedFields = ['title', 'image_url', 'description', 'tag'];
    if (!in_array($field, $allowedFields)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid field.']);
        exit;
    }

    try {
        // Start a transaction to ensure both updates are applied
        $conn->beginTransaction();

        // Update the specified field
        $stmt = $conn->prepare("UPDATE News SET $field = :value WHERE id = :id");
        $stmt->bindParam(':value', $value, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // If updateTag is true, also update the tag field
        if ($updateTag) {
            $stmt = $conn->prepare("UPDATE News SET tag = CONCAT(tag, ' (edited by admin)') WHERE id = :id AND NOT tag LIKE '%(edited by admin)%'");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
        }

        // Commit the transaction
        $conn->commit();

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Field updated successfully.']);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'News item not found or no changes made.']);
        }
    } catch (PDOException $e) {
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to update field: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}

?>