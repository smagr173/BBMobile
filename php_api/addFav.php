<?php
session_start();
include "functions.php";

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	
	$record = $_SESSION['record'];
	if ($record['lname'] != null) {
	   $email = $record['email'];
	   
	      $db = new PDO("sqlite:content.db");
	      $sql = "SELECT * FROM favorites WHERE email='$email'";
	      $stmt = $db->query($sql);
              // return cart as an associative array
	      $favorites = $stmt->fetchall(PDO::FETCH_ASSOC);
              $db = NULL;
	   
	      $name = $obj['name'];
	      $price = $obj['price'];
	      $option1 = $obj['option1'];
	      $option2 = $obj['option2'];
	      $extra1 = $obj['extra1'];
	      $extra2 = $obj['extra2'];
	      $extra3 = $obj['extra3'];
	      
	   
	      if ($favorites == null) {
		$favCount = 1;
		addFav($email,$name,$price,$favCount,$option1,$option2,$extra1,$extra2,$extra3);
		$msgs['succ'] = "Item has been favorited";
	      }
	      else {
		  $favs = checkFav($email);
		  $favCount = $favs['fav_id'];
		  $favCount += 1;
		 $matches = false;
			foreach($favorites as $favArr) {
				$favName = $favArr['name'];
				$favOpt1 = $favArr['option1'];
				$favOpt2 = $favArr['option2'];
				$favExt1 = $favArr['extra1'];
				$favExt2 = $favArr['extra2'];
				$favExt3 = $favArr['extra3'];
				if ($favName == $name && $favOpt1 == $option1
				     && $favOpt2 == $option2 && $favExt1 == $extra1
				     && $favExt2 == $extra2 && $favExt3 == $extra3)
				{
					$matches = true;
					break;
				}
				     else {
					$matches = false;
				     }
			}
			if ($matches == false) {
				$msgs['succ'] = "Item has been favorited";
				addFav($email,$name,$price,$favCount,$option1,$option2,$extra1,$extra2,$extra3);
			}
			else {
			     $msgs['succ'] = "Item is already a favorite";
			}
	      }
	}
	else {
	   $msgs['succ'] = "Please sign in to favorite an item";
	}
	echo json_encode($msgs);  // Output messages in JSON format
	
?>