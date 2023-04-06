<?php
session_start();

$json = file_get_contents('php://input');

// Parse JSON format to PHP object
   $obj = json_decode($json,true);
   
   $option = $obj['getCart'];

 $record = $_SESSION['record'];
 $email = $record['email'];
$db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM cart WHERE email='$email'";
        $stmt = $db->query($sql);
        // return cart as an associative array
	$cart = $stmt->fetchall(PDO::FETCH_ASSOC);

$db = NULL;

if ($option != null) {
    if ($option == 'getTotal') {
      $total = 0;
      $itemTotal = 0;
      foreach($cart as $cartArr) {
        $itemTotal = $cartArr['price'] * $cartArr['quantity'];
	$total = $total + $itemTotal;
      }
      echo json_encode($total);
    }
    if ($option == 'getQuant') {
      $quantity = 0;
      $totalItems = 0;
      foreach($cart as $cartArr) {
        $quantity = $cartArr['quantity'];
	$totalItems = $totalItems + $quantity;
      }
      echo json_encode($totalItems);
    }
}
else {
      echo json_encode($cart);  // Display messages in JSON format    
}

?>
