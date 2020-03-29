<?php
session_start();

 $record = $_SESSION['record'];
 $email = $record['email'];
$db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM cart WHERE email='$email'";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$cart = $stmt->fetchall(PDO::FETCH_ASSOC);

$db = NULL;

echo json_encode($cart);  // Display messages in JSON format
?>