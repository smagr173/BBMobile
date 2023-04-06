<?php
session_start();
include "functions.php";

$record = $_SESSION['record'];
$email = $record['email'];
$hashed = $record['password'];

// Get JSON inputs, store in variable
  $json = file_get_contents('php://input');
	
// Parse JSON format to PHP object
   $obj = json_decode($json,true);
	
// Set first name variable from input
   $emailNew = $obj['emailUp'];
   
   $passEntered = $obj['currPass'];

   $validEmail = false;
   $validEmail2 = false;
   $passwordFilled = false;
   $passMatch = false;
   $updatedE = false;
        if ($emailNew != NULL) {  // Check if input is empty for email
        $validEmail = true;
	}
	else {
	     $msgs['eErr'] = "Valid email address is required";
	}
	if (!updateEmailExist($emailNew,$hashed)) {   // Check if email entered is unique or not
        $validEmail2 = true;
	}
	else {
        $msgs['eTaken'] = "The email address entered is already taken";
	}
        if ($passEntered != NULL) {
	    $passwordFilled = true;
        }
        else {
	    $msgs['emptPass'] = "Current password is required";
        }
        if ($validEmail && $validEmail2 && $passwordFilled) {
		$passMatch = password_verify($passEntered, $hashed);
		if ($passMatch) {
		$updatedE = updateEmail($emailNew,$hashed);
		  if ($updatedE) {
		  $newRecord = getUserRecord($emailNew);
		  $_SESSION['record'] = $newRecord;
	          $msgs['succ'] = "Successfully Updated";
	          }
		  else {
	          $msgs['fail'] = "Could not insert";
	          }
		
		}
		else {
		$msgs['incorPass'] = "Invalid email/password combo";
	        }
	
	}
	        
  echo json_encode($msgs);  // Display messages in JSON format

?>
