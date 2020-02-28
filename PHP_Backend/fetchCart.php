<?php
session_start();
require_once('item_class.php'); // item object 
require_once('cart_session.php'); // Cart object 

    $validRecord = false;
    if (isset($_SESSION['record'])) {
	$validRecord = true;
    }
    else {
        $msgs['err'] = "Please sign in to add items to your bag";
	echo json_encode($msgs);
    }
    if ($validRecord && isset($_SESSION['cart'])) {
	    
	$obj = unserialize($_SESSION['cart']);
	$obj->sendCart(); 
	
    }
    elseif ($validRecord && !isset($_SESSION['cart'])) {
        $msgs['empty'] = "There are no items in your bag";
	echo json_encode($msgs);
    }
      // Output messages in JSON format
?>