<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Delete Contact</title>
	<link rel="stylesheet" href="style.css">
	</head>
	<body>
    <div class="header">
    <h2>Welcome! Feel Free to Explore the Site</h2>
    <img src="images/titlePic.jpg" alt="Contact Book" style="width:285px;height:120px;">
    </div>
<div class="nav">
<?php
if (isset($_SESSION['record'])) {
?>
    <a href="index.php">Home</a>
    <a href="add.php">Create Contact</a>
	<a href="update.php">Update Contact</a>
	<a href="view.php">View Contacts</a>
	<a href="log_out.php">Log Out</a>
<?php
}
else{
?>
  <a href="index.php">Home</a>
  <a href="sign_in.php">Sign In</a>
  <a href="create_account.php">Create Account</a>
<?php
}
?>
</div>

<?php
if (isset($_SESSION['record'])) {
?>
    <h1>Delete Contact</h1>
	
<script>
function validate() {
	var e = document.forms["delete"]["name"].value;
	if (e == "") {
		alert("The name must be filled out");
		return false;
	}
}
</script>
	
    <form name="delete" action="delete.php" onsubmit="return validate()" method="post">
       <label>Name <input type="text" name="name"></label>
       <input type="submit" class="button" value="Delete Contact">
    </form>
<?php
}
else{
	print("<p>Sign in or create an account to delete contacts.</p>");
}

include "functions.php";
if (isset($_POST['name'])) {
	$record = $_SESSION['record'];
    $user_name = $record['name'];
    $name = $_POST['name'];
    if ($name === "") {
        print "<p>&quot;&quot; is not a valid name.</p>";
    }
    else if (!doesNameExist($user_name, $name)) {
        print "<p>No contact exists for &quot;$name&quot;</p>";
    }
    else {
        deleteRecord($user_name, $name);
        print "<p>$name's contact has been deleted.</p>";
    }
}
?>
  </body>
</html>
