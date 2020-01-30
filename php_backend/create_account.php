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
	     $msgs[] = "Please fill out the first name field";
	}
	if ($lname != NULL) {   // Check if input is empty for last name
	$validLname = true; 
	}
	else {
	     $msgs[] = "Please fill out the last name field";
	}
	if ($email != NULL) {  // Check if input is empty for email
        $validEmail = true;
	}
	else {
	     $msgs[] = "Please fill out the email field";
	}
	if (!doesEmailExist($email)) {   // Check if email entered is unique or not
        $validEmail2 = true;
	}
	else {
	     $msgs[] = "The email you have entered is already in use";
	}
	if ($password1 != NULL) {   // Check if input is empty for password1
	$validPassword1 = true; 
	}
	else {
	     $msgs[] = "Please fill out the password field";
	}
	if ($validFname && $validLname && $validEmail && $validEmail2 && $validPassword1) {
		$hashed = password_hash($password1, PASSWORD_DEFAULT);  // Hash the user's password using PHP function
		$inserted = insertUserRecord($fname, $lname, $email, $hashed);  // Call function to insert into DB
		if ($inserted) {
		$msgs[] = "User registered Successfully";
		}
		else {
			$msgs[] = "Register failed";
		}
	}
	echo json_encode($msgs);  // Display messages in JSON format
?>
