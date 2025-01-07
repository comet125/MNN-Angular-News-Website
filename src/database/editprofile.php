<?php
// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow requests from Angular app
header("Access-Control-Allow-Methods: POST, OPTIONS");       // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type");        // Allow Content-Type header

// Handle OPTIONS request (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include the database connection
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (!isset($data['username'], $data['first_name'], $data['surname'], $data['oldPassword'], $data['newPassword'])) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    $username = trim($data['username']);
    $first_name = trim($data['first_name']);
    $surname = trim($data['surname']);
    $oldPassword = trim($data['oldPassword']);
    $newPassword = trim($data['newPassword']);

    // Validate non-empty fields
    if (empty($username) || empty($first_name) || empty($surname) || empty($oldPassword) || empty($newPassword)) {
        http_response_code(400);
        echo json_encode(['error' => 'Fields cannot be empty.']);
        exit;
    }

    try {
        // Check if the user exists with the provided username
        $stmt = $conn->prepare("SELECT * FROM Users WHERE username = :username");
        $stmt->execute(['username' => $username]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found.']);
            exit;
        }

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify old password matches using password_verify
        if (!password_verify($oldPassword, $user['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Old password is incorrect.']);
            exit;
        }

        // Hash the new password before updating it
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Update user's profile with the new hashed password
        $updateStmt = $conn->prepare("
            UPDATE Users 
            SET first_name = :first_name, surname = :surname, password = :newPassword 
            WHERE username = :username
        ");
        $updateStmt->execute([
            'first_name' => $first_name,
            'surname' => $surname,
            'newPassword' => $hashedNewPassword, // Store the hashed password
            'username' => $username
        ]);

        echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
