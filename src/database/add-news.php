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
require_once 'db.php';  // Ensure this is the correct path

// Check if PDO connection is established
if (!$conn) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// Handle incoming POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present
    if (!isset($data['title'], $data['image_url'], $data['description'], $data['tag'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Assign variables
    $title = trim($data['title']);
    $image_url = trim($data['image_url']);
    $description = trim($data['description']);
    $tag = trim($data['tag']);

    // Validate fields (basic validation)
    if (empty($title) || empty($image_url) || empty($description) || empty($tag)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Fields cannot be empty.']);
        exit;
    }

    // Check if image URL is a valid URL
    if (!filter_var($image_url, FILTER_VALIDATE_URL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid image URL format.']);
        exit;
    }

    // Optional: Check if the URL actually points to an image (via a HEAD request)
    $headers = get_headers($image_url, 1);
    if (strpos($headers['Content-Type'], 'image') === false) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'The URL does not point to a valid image.']);
        exit;
    }

    try {
        // Insert the news into the database
        $stmt = $conn->prepare("INSERT INTO News (title, image_url, description, tag) 
                                VALUES (:title, :image_url, :description, :tag)");
        $stmt->execute([
            'title' => $title,
            'image_url' => $image_url,
            'description' => $description,
            'tag' => $tag
        ]);

        // Success response
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'News added successfully.']);
    } catch (PDOException $e) {
        // Catch database errors
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to add news: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}
?>
