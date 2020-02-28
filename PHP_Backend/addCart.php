<?php
session_start();
require_once('item_class.php'); // item object 
require_once('cart_session.php'); // Cart object 

$shoppingCartLocal; // local variable for shoppingCart

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	$name = $obj['name'];
	$quantity = $obj['quantity'];
	$price = $obj['price'];

	if (isset($_SESSION['cart'])) { 
        // var_dump($_SESSION["shoppingCart"]); 
        // print_r($_SESSION["shoppingCart"]); 
     
        // a serialized session need to be unserialized back to the object 
        $shoppingCartLocal = unserialize($_SESSION['cart']); 
	} 
	else  {
        $shoppingCartLocal = new ShoppingCart(); }
     
	if (isset($_SESSION['record'])) {
        // add new item to shoppingCart & update shoppingCart session 
        // need to serialize the object to be used in session 
         $_SESSION['cart'] = serialize($shoppingCartLocal->addItem(new Item($name, $quantity, $price)));
	 $msgs['succ'] = "Success"; 
	}     
	else {
	    $msgs['noRecord'] = "Please sign in to add an item to your bag";
	}
	
	echo json_encode($msgs);  // Output messages in JSON format
?>