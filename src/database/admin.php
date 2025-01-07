<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('db.php');

// Handle GET: Fetch all users, excluding the admin with id = 1
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM Users WHERE id != 1";  // Exclude admin with ID 1
    $stmt = $conn->query($query);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    exit();
}


// Handle PUT: Update a user
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    $id = $inputData['id'];
    $field = $inputData['field'];
    $value = $inputData['value'];

    $allowedFields = ['username', 'first_name', 'surname', 'email', 'password'];
    if (in_array($field, $allowedFields)) {
        $query = "UPDATE Users SET $field = :value WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':value', $value);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        echo json_encode(['status' => 'success', 'message' => 'User updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid field']);
    }
    exit();
}

// Handle DELETE: Delete a user
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read the JSON body
    $inputData = json_decode(file_get_contents('php://input'), true);
    $id = $inputData['id']; // Extract the user ID to delete

    // Check if ID is valid
    if (!empty($id)) {
        // Prepare and execute the DELETE query
        $query = "DELETE FROM Users WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        // Return success response
        echo json_encode(['status' => 'success', 'message' => 'User deleted successfully']);
    } else {
        // Return error if ID is missing or invalid
        echo json_encode(['status' => 'error', 'message' => 'Invalid user ID']);
    }
    exit();
}

// Default response for unsupported methods
http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
exit();
?>
