<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Update Contact</title>
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
    <a href="delete.php">Delete Contact</a>
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
include "functions.php";

$stickyName = null;
$stickyCategory = null;
$stickyValue = null;
$msgs = array();

$record = $_SESSION['record'];
$user_name = $record['name'];

if (isset($_POST['name']) 
    && isset($_POST['category'])
    && isset($_POST['value']))
{
    $validName = false;
    $validCategory = false;
    $validValue = false;
    extract($_POST);  
     
    // validate the name
    if (doesNameExist($user_name, $name) && $name != "") {
        $stickyName = $name;
        $validName = true;
    }
    else {
        $msgs[] = "<p>No contact exists for &quot;$name&quot;.</p>";
    }

    // validate the category
    if (isValidCategory($category)) {
        $stickyCategory = $category;
        $validCategory = true;
    }
    else {
        $msgs[] = "<p>&quot;$category&quot; is not a valid category.</p>";
    }

    // validate the value
    if ($stickyCategory) {
        $stickyValue = $value;
        $validValue = true;
    }
    else {
        $msgs[] = "<p>&quot;$value&quot; is not a valid value for category $category.</p>";
    }

    if ($validName && $validCategory && $validValue) {
        updateRecord($user_name, $name, $category, $value);
        $msgs[] = "<p>&quot;$stickyName's&quot; contact has been updated.</p>";
        $stickyName = null;
        $stickyCategory = null;
        $stickyValue = null;
    }
}
if (isset($_SESSION['record'])) {
?>
    <h1>Update Contact</h1>
	
<script>
function validate() {
	var e = document.forms["update"]["name"].value;
	if (e == "") {
		alert("The name must be filled out.");
		return false;
	}
	var f = document.forms["update"]["value"].value;
	if (f == "") {
		alert("The value must be filled out.");
		return false;
	}
	var g = document.forms["update"]["value"].value;
	var t = document.forms["update"]["category"].value;
	if (t == "contact_num" && isNaN(g)) {
		alert("The number must be numeric.");
		return false;
	}
	if (t == "contact_email") {
		var reg = /\S+@\S+/;
		if (reg.test(g) == false) {
        alert("You have entered an invalid email address.");
		return false;
	}
    }
}
</script>
	
    <form name="update" action="update.php" onsubmit="return validate()" method="post">
    <label>Name <input type="text" name="name" value="<?php print $stickyName; ?>"></label>
       <label>Category
         <select name="category">
         <option value="contact_num" <?php print ($stickyCategory === 'contact_num') ? "selected" : null; ?>>Number</option>
            <option value="contact_email" <?php print ($stickyCategory === 'contact_email') ? "selected" : null; ?>>Email</option>
            <option value="contact_addr" <?php print ($stickyCategory === 'contact_addr') ? "selected" : null; ?>>Address</option>
         </select>
       </label>
       <label>Value <input type="text" name="value" value="<?php print $stickyValue; ?>"></label>
	   <div><br></div>
       <input type="submit" class="button2" value="Update Contact">
    </form>
<?php
}
else{
	print("<p>Sign in or create an account to update contacts.</p>");
}

foreach($msgs as $msg) {
    print($msg);
}
?>
  </body>
</html>