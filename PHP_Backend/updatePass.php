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
   $currentPass = $obj['currPass2'];
   
   $newPass = $obj['NewPass'];

   $validCurrPass = false;
   $validNewPass = false;
   $passMatch = false;
   $updatedP = false;
        if ($currentPass != NULL) {  // Check if input is empty for email
        $validCurrPass = true;
	}
	else {
	     $msgs['curErr'] = "Current password is required";
	}
        if ($newPass != NULL) {
	    $validNewPass = true;
        }
        else {
	    $msgs['newErr'] = "New password is required";
        }
        if ($validCurrPass && $validNewPass) {
		$passMatch = password_verify($currentPass, $hashed);
		if ($passMatch) {
		$hashedNew = password_hash($newPass, PASSWORD_DEFAULT);
		$updatedP = updatePassRecord($hashedNew,$email);
		  if ($updatedP) {
		  $newRecord = getUserRecord($email);
		  $_SESSION['record'] = $newRecord;
	          $msgs['succ'] = "Successfully Updated";
	          }
		  else {
	          $msgs['fail'] = "Could not insert";
	          }
		}
		else {
		$msgs['wrongPass'] = "Current password is incorrect";
	        }
	}
  echo json_encode($msgs);  // Display messages in JSON format

?>