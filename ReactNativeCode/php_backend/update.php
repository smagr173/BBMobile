<?php
session_start();
include "functions.php";

$record = $_SESSION['record'];
$email = $record['email'];
$fName = $record['fname'];
$lName = $record['lname'];

// Get JSON inputs, store in variable
  $json = file_get_contents('php://input');
	
// Parse JSON format to PHP object
   $obj = json_decode($json,true);
	
// Set first name variable from input
   $fNameNew = $obj['fNameUp'];

// Set last name from input value
   $lNameNew = $obj['lNameUp'];

$validFname = false;
$validLname = false;
  if ($fNameNew != NULL) {   // Check if input is empty for email
    $validFname = true;
  }
  else {
    $msgs['FnameErr'] = "Valid first name is required";
  }
  if ($lNameNew != NULL) {   // Check if input is empty for email
    $validLname = true;
  }
  else {
    $msgs['LnameErr'] = "Valid last name is required";
  }
  if ($validLname && $validFname) {
    $updatedF = updateFname($fNameNew,$email);
    $updatedL = updateLname($lNameNew,$email);
	if ($updatedF && $updatedL) {
		$newRecord = getUserRecord($email);
		$_SESSION['record'] = $newRecord;
	        $msgs['succ'] = "Successfully Updated";
	}
	else {
	      $msgs['fail'] = "Could not insert";
	}
  }
  echo json_encode($msgs);  // Display messages in JSON format

?>