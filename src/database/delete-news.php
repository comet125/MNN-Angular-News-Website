<?php
// Allow CORS for specific methods
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include the database connection file
require_once 'db.php'; // Ensure this is the correct path

// Check if PDO connection is established
if (!$conn) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to connect to the database.']);
    exit;
}

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get raw DELETE request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if the required 'id' field is present
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'ID is required for deletion.']);
        exit;
    }

    $id = (int)$data['id'];

    try {
        // Prepare and execute delete query
        $stmt = $conn->prepare("DELETE FROM News WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'News item deleted successfully.']);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'News item not found.']);
        }
    } catch (PDOException $e) {
        // Handle database errors
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete news item: ' . $e->getMessage()]);
    }
} else {
    // Handle unsupported HTTP methods
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}
?>
