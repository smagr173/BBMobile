<?php
session_start();

// Fetch user record
$record = $_SESSION['record'];
$email = $record['email'];
$fName = $record['fname'];
$lName = $record['lname'];

$msg['fname'] = $fName;
$msg['lname'] = $lName;
$msg['email'] = $email;

echo json_encode($msg);  // Display messages in JSON format
?>