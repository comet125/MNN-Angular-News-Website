<?php
header("Access-Control-Allow-Origin: http://localhost:4200");  // Allow only localhost:4200 to make requests
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow necessary headers

// Include database connection file
include('db.php');

// Get the raw POST data
$inputData = json_decode(file_get_contents('php://input'), true);

// Check if the necessary data is received
if (isset($inputData['email']) && isset($inputData['password'])) {
    // Get the input data
    $email = $inputData['email'];
    $password = $inputData['password'];

    // SQL query to fetch the user by email
    $query = "SELECT * FROM Users WHERE email = :email";
    
    // Prepare the query using PDO
    $stmt = $conn->prepare($query);

    // Bind the email parameter to the query
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);

    // Execute the query
    $stmt->execute();

    // Check if a user was found
    if ($stmt->rowCount() > 0) {
        // Fetch the user's data from the result
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Compare the provided password with the stored hashed password using password_verify()
        if (password_verify($password, $user['password'])) {
            // If the passwords match, return success
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'username' => $user['username'],
                'firstName' => $user['first_name'],
                'surname' => $user['surname']
            ]);
        } else {
            // If the passwords don't match, return an error
            echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
        }
    } else {
        // If no user is found with that email, return an error
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
    }
} else {
    // If required POST parameters are missing, return an error
    echo json_encode(['status' => 'error', 'message' => 'Missing email or password']);
}

// Close the database connection
$conn = null;
?>
