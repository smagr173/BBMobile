<?php
session_start();

$json = file_get_contents('php://input');

// Parse JSON format to PHP object
   $obj = json_decode($json,true);
   
   $order_id = $obj['getOrder'];

 $record = $_SESSION['record'];
 $email = $record['email'];

   $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM storeOrder WHERE email='$email' AND orderID='$order_id'";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$order = $stmt->fetchall(PDO::FETCH_ASSOC);
    $db = NULL;

      echo json_encode($order);  // Display messages in JSON format    

?>