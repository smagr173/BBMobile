<?php
session_start();
include "functions.php";

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	$itemID = 1;
	if (isset($_SESSION['record'])) {
	   $record = $_SESSION['record'];
	   $email = $record['email'];
	
           $name = $obj['name'];
	   $quantity = $obj['quantity'];
	   $price = $obj['price'];
	   $notes = $obj['notes'];
	   $options = $obj['options'];
	
	   $cart = checkCart($email);
	  $itemID = $cart['item_id'];
	   if ($itemID > 0) {
	      $itemID += 1;
	      addBag($email,$name,$price,$quantity,$itemID,$notes,$options);
	      $msgs['succ'] = "Success"; 
	   }
	   else {
	      $itemID = 1;
	      addBag($email,$name,$price,$quantity,$itemID,$notes,$options);
	      $msgs['succ'] = "Success"; 
	   }
	}
	else {
	    $msgs['noRecord'] = "Please sign in to add an item to your bag";
	}
	
	echo json_encode($msgs);  // Output messages in JSON format
?>