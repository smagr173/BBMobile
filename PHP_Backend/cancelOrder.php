<?php
session_start();
include "functions.php";

$json = file_get_contents('php://input');

// Parse JSON format to PHP object
   $obj = json_decode($json,true);
   
   $order_id = $obj['sendOrder'];
   
   $record = $_SESSION['record'];
   $email = $record['email'];

cancelOrder($order_id,$email);
    
        $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM orderInfo WHERE email='$email' AND status='Pending' OR status='In Progress'";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$orderInfo = $stmt->fetchall(PDO::FETCH_ASSOC);
    $db = NULL;
    
    echo json_encode($orderInfo);

?>