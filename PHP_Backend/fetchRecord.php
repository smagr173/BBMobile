<?php
session_start();

if (isset($_SESSION['record'])) {
// Fetch user record
$record = $_SESSION['record'];

$email = $record['email'];
$fName = $record['fname'];
$lName = $record['lname'];

$msg['fname'] = $fName;
$msg['lname'] = $lName;
$msg['email'] = $email;
}
else {
	$msg['empty'] = 0;
}

echo json_encode($msg);  // Display messages in JSON format
?>