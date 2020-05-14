<?php
session_start();
include "functions.php";

$json = file_get_contents('php://input');

// Parse JSON format to PHP object
   $obj = json_decode($json,true);
   
   $fav_id = $obj['sendID'];
   
   $record = $_SESSION['record'];
   $email = $record['email'];

   removeFav($fav_id,$email);
    
      $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM favorites WHERE email='$email'";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$favs = $stmt->fetchall(PDO::FETCH_ASSOC);
    $db = NULL;

      echo json_encode($favs);  // Display messages in JSON format  

?>