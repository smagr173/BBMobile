<!--*************************************************************************//
//																			 //
//  Author:    	 Dr. Tan                                                     //
//  Edited by:	 Stephen Magrowski											 //
//  Major:		 Software Development										 //
//  Class:     	 CSC 242-020                                                 //
//	Professor:   Dr. Tan													 //
//	Created on:  10/13/17													 //
//	Due:		 10/16/17													 //
//  Assignment:  Project 2                                                   //
//  Filename:    lab-12-5-cart-session.php                                   //
//  Purpose:     This file is for the shopping cart page, which displays     //
//				 the items that the user has added to their cart.            //
//				 The information about the item is shown, along with the     //
//				 total number of items in the cart. A PHP session is used    //
//				 to maintain the information when navigating the site.		 //
//**************************************************************************-->

<!doctype html> 
<html lang="en">
<head>
 <meta charset="utf-8"> 
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title>Cells 4 Less </title>
 <link rel="stylesheet" href="project1.css">
	</head>
	<body>
		<div class="wrapper">
			<div class="header">	<!-- Header with company name and image -->
				<h2>
				Cells 4 Less
				</h2>
				<img src="images/smartphones.jpg" alt="Cells 4 Less" style="width:250px;height:120px;">
		</div>
		<h1>
		Browse our selection of smartphones and accessories!
		</h1>
		<div class="nav">		<!-- Navigation for two categories -->
		<a href="index.php">Home</a>
		| Category:
		<a href="smartphones.php">Smartphones</a>
		-- or --
		<a href="accessories.php"> Accessories</a>
		 | 
		<a href="lab-12-5-cart-session.php"> Cart</a>
<style> 
body { 
    text-align:center; 
} 
h2 { 
    color:#58a8bb; 
} 
.box{ 
    margin:20px auto; 
    max-width:700px; 
    padding:20px; 
    text-align:left; 
} 
table {  
    border-collapse: collapse;
} 
tr:nth-child(1) { 
    border-bottom:2px solid #58a8bb; 
} 
tr:last-child { 
    border-bottom:2px solid #58a8bb; 
} 
th, td { 
    padding:4px 10px; 
} 
.btn-link { 
    border: none; 
    background-color: transparent; 
    text-decoration: underline; 
    cursor: pointer; 
} 
.btn-link:hover { 
    color:deepskyblue; 
} 
</style> 
</head> 
<body> 

<?php  
session_start(); // Start the session 

require_once('lab-05-1-item.php'); // item object 
require_once('lab-12-3-shoppingcart-session.php'); // ShoppingCart object 
     
$shoppingCartLocal; // local variable for shoppingCart 

if (isset($_SESSION["shoppingCart"])) 
{ 
    // var_dump($_SESSION["shoppingCart"]); 
    // print_r($_SESSION["shoppingCart"]); 
     
    // a serialized session need to be unserialized back to the object 
    $shoppingCartLocal = unserialize($_SESSION["shoppingCart"]); 
} 
else  
    $shoppingCartLocal = new ShoppingCart(); 
     
// check form post method "Add to Cart" from product page 
if (isset($_POST["pid"]) && isset($_POST["name"]) && isset($_POST["price"])) 
{ 
    $pid = htmlspecialchars($_POST["pid"]);  
    $name = htmlspecialchars($_POST["name"]);  
    $price = htmlspecialchars($_POST["price"]);  

    // add new item to shoppingCart & update shoppingCart session 
    // need to serialize the object to be used in session 
    $_SESSION["shoppingCart"] = serialize($shoppingCartLocal->addItem(new Item($pid, $name, $price)));  
}     

// check form get method within cart page itself -> remove the item in shoppingCart 
if (isset($_GET["remove"]))  
    $_SESSION["shoppingCart"] = serialize($shoppingCartLocal->deleteItem(htmlspecialchars($_GET["pid"]))); 

// check form get method within cart page itself -> update the item in shoppingCart 
if (isset($_GET["update"]) && isset($_GET["qty"])) { 
    $_SESSION["shoppingCart"] = serialize($shoppingCartLocal->updateItemByPid(htmlspecialchars($_GET["pid"]), htmlspecialchars($_GET["qty"]))); 
} 
     
echo "<h2>Your Shopping Cart</h2>"; 
// Show the shoppingCart contents using print method from shoppingcart object 
echo "<span>Items in Cart: " . $shoppingCartLocal->countItemsQty() . "</span>"; 
echo '<div class="box">'; 
$shoppingCartLocal->PrintShoppingCart(); 
echo '</div>'; 
?> 

<button onclick="location.href='index.php'">Choose another Product</button> 

</body> 
</html>