<?php
session_start();

if (isset($_SESSION['record'])) {
$record = $_SESSION['record'];
}
else {
	$record = 0;
}
echo json_encode($record);  // Output messages in JSON format
?>