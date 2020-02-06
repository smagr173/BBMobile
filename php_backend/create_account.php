<?php
include "functions.php";

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	// Set user first name variable from input
	$fname = $obj['fname'];
	// Set user last name variable from input
	$lname = $obj['lname'];
	// Set user email variable from input
	$email = $obj['email'];
	// Set user password1 variable from input
	$password1 = $obj['password1'];
	
	$validFname = false;
	$validLname = false;
	$validEmail = false;
	$validEmail2 = false;
	$validPassword1 = false;
	$inserted = true;
	if ($fname != NULL) {   // Check if input is empty for first name
	$validFname = true; 
	}
	else {
	     $msgs['fnameErr'] = "First name is required";
	}
	if ($lname != NULL) {   // Check if input is empty for last name
	$validLname = true; 
	}
	else {
	     $msgs['lnameErr'] = "Last name is required";
	}
	if ($email != NULL) {  // Check if input is empty for email
        $validEmail = true;
	}
	else {
	     $msgs['eErr'] = "Email address is required";
	}
	if (!doesEmailExist($email)) {   // Check if email entered is unique or not
        $validEmail2 = true;
	}
	else {
	     $msgs['eTaken'] = "The email you entered is already being used";
	}
	if ($password1 != NULL) {   // Check if input is empty for password1
	$validPassword1 = true; 
	}
	else {
	     $msgs['passReq'] = "Password is required";
	}
	if ($validFname && $validLname && $validEmail && $validEmail2 && $validPassword1) {
		$hashed = password_hash($password1, PASSWORD_DEFAULT);  // Hash the user's password using PHP function
		$inserted = insertUserRecord($fname, $lname, $email, $hashed);  // Call function to insert into DB
		if ($inserted) {
		$msgs['succ'] = "Registration successful";
		}
		else {
			$msgs['fail'] = "Register failed: Check connection";
		}
	}
	echo json_encode($msgs);  // Display messages in JSON format
?>
