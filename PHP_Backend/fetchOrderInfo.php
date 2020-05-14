<?php
session_start();

$json = file_get_contents('php://input');

// Parse JSON format to PHP object
   $obj = json_decode($json,true);
   
   $option = $obj['option'];
   
   $record = $_SESSION['record'];
   $email = $record['email'];
   
   if ($option == "Complete") {
    $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM orderInfo WHERE (email='$email' AND status='Canceled') OR (email='$email' AND status='Complete')";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$orderInfo = $stmt->fetchall(PDO::FETCH_ASSOC);
    $db = NULL;
    
    echo json_encode($orderInfo);
   }
   else {
    $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM orderInfo WHERE (email='$email' AND status='Pending') OR (email='$email' AND status='In Progress')";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$orderInfo = $stmt->fetchall(PDO::FETCH_ASSOC);
    $db = NULL;
    
    echo json_encode($orderInfo);
   }

?>