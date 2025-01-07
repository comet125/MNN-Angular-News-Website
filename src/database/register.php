<?php

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");  // Allow only localhost:4200 to make requests
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow necessary headers

// Handle OPTIONS request (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond with 200 OK and the necessary headers for preflight
    http_response_code(200);
    exit;
}

// Include the database connection file
require_once 'db.php';

// Handle incoming POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present
    if (!isset($data['username'], $data['first_name'], $data['surname'], $data['email'], $data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    // Assign variables
    $username = trim($data['username']);
    $first_name = trim($data['first_name']);
    $surname = trim($data['surname']);
    $email = trim($data['email']);
    $password = trim($data['password']);

    // Validate fields (basic validation)
    if (empty($username) || empty($first_name) || empty($surname) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Fields cannot be empty.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit;
    }

    try {
        // Check if the username or email already exists
        $stmt = $conn->prepare("SELECT * FROM Users WHERE username = :username OR email = :email");
        $stmt->execute(['username' => $username, 'email' => $email]);
        if ($stmt->rowCount() > 0) {
            http_response_code(409);
            echo json_encode(['error' => 'Username or email already exists.']);
            exit;
        }

        // Hash the password using bcrypt before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database with the hashed password
        $stmt = $conn->prepare("INSERT INTO Users (username, first_name, surname, email, password) 
                                VALUES (:username, :first_name, :surname, :email, :password)");
        $stmt->execute([
            'username' => $username,
            'first_name' => $first_name,
            'surname' => $surname,
            'email' => $email,
            'password' => $hashedPassword  // Store the hashed password
        ]);

        // Success response
        http_response_code(201);
        echo json_encode(['message' => 'User registered successfully.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
