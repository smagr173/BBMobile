<?php
session_start();
session_unset();
session_destroy();
echo json_encode(0);  // Output messages in JSON format
?>
