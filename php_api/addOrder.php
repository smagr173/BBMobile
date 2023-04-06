<?php
session_start();
include "functions.php";

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	date_default_timezone_set("America/New_York");
	
	$record = $_SESSION['record'];
	if ($record['lname'] != null) {
	   $email = $record['email'];
	   
	   $db = new PDO("sqlite:content.db");
           $sql = "SELECT * FROM cart WHERE email='$email'";
           $stmt = $db->query($sql);
           // return cart as an associative array
	   $cart = $stmt->fetchall(PDO::FETCH_ASSOC);

           $db = NULL;
	   
	   $subtotal = $obj['total'];
	   $combTotal = $obj['combTotal'];
	   
	   $currentTime = time();
	   $time_placed = date("g:i a", $currentTime);
	   $date_placed = date("n-j-y");
	   $status = "Pending";
	   $orderID = rand(0,100000000);
	   
	   $pickupStr = $obj['pickup'];
	   if ($pickupStr == "ASAP (15-20 mins)") {
		$pickup = date("g:i a", time() + 1200);
	   }
	   else {
	        $pickup = $pickupStr;
	   }
	   
	   addOrder($orderID,$email,$pickup,$time_placed,$date_placed,$status,$subtotal,$combTotal);
	   
	   foreach($cart as $obj) {
	      $name = $obj['name'];
	      $itemID = $obj['item_id'];
	      $quantity = $obj['quantity'];
	      $price = $obj['price'];
	      $notes = $obj['notes'];
	      $option1 = $obj['option1'];
	      $option2 = $obj['option2'];
	      $extra1 = $obj['extra1'];
	      $extra2 = $obj['extra2'];
	      $extra3 = $obj['extra3'];
	      
	      addStoreOrder($orderID,$email,$name,$price,$quantity,$itemID,$notes,$option1,$option2,$extra1,$extra2,$extra3);
           }
	      $db = new PDO("sqlite:content.db");
              $sql = "DELETE FROM cart WHERE email=?";
	
              $stmt = $db->prepare($sql);
              $bool=$stmt->execute([$email]);
              $db = NULL;
	   $msgs['succ'] = $orderID;
	}
	else {
	   $msgs['noAccount'] = "Please sign in to place an order";
	}
	echo json_encode($msgs);  // Output messages in JSON format
	
?>