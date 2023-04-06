<!--*************************************************************************//
//																			 //
//  Author:    	 Stephen Magrowski                                           //
//  Major:		 Software Development										 //
//  Class:     	 CSC 242-020                                                 //
//	Professor:   Dr. Tan													 //
//	Created on:  9/10/17													 //
//	Due:		 10/16/17													 //
//  Assignment:  Project 2                                                   //
//  Filename:    accessories.php                                             //
//  Purpose:     The purpose of this file is to display the accessories      //
//				 with its price and details. The user can also add the       //
//				 item to their shopping cart then continue to browse.        //
//**************************************************************************-->

<!DOCTYPE html>
<html>
	<head>
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
	<div class="nav">	<!-- Navigation for two categories -->
		<a href="index.php">Home</a>
			| Category
		<a href="smartphones.php">Smartphones</a>
			-- or --
		<a href="accessories.php"> Accessories</a>
		 | 
		<a href="lab-12-5-cart-session.php"> Cart</a>
		
		<table class="products">
			<tbody>
			<tr>
		    <td>
			<img src="images/gear_vr.jpg" alt="Samsung Gear VR" style="width:190px;height:180px;">
			</td>
		<td>
		<h4>Samsung Gear VR</h4>
		<h4>Price: $99.99</h4>
		<p1>Immerse yourself in virtual reality fun <br> with Gear VR goggles. Whether you <br>want to
		experience movies on the big <br>screen or enter your favorite gaming <br>world, simply snap in
		a smartphone <br>to make it possible.</p1>
		</td>
		<td>
		<h4>Specifications:</h4>
		<ul>
			<li>Bluetooth Pairing</li>
			<li>Weight: 0.76 lbs</li>
			<li>Dimensions 8 x 5 x 4</li>
			<li>Controller Included</li>
		</ul>
		<form name="form5" method="post" action="lab-12-5-cart-session.php">
		<input type="hidden" name="pid" value="5"> 
		<input type="hidden" name="name" value="Samsung Gear VR"> 
		<input type="hidden" name="category" value="Accessories"> 
		<input type="hidden" name="price" value="99.99"> 
		<input type="submit" name="add" value="Add to Cart">
		</form>
		</td>	
			<tr>
		    <td>
			<img src="images/fitbit2.jpg" alt="Fitbit Wristband" style="width:180px;height:190px;">
			</td>
		<td>
		<h4>Fitbit Heart Rate Wristband</h4>
		<h4>Price: $69.98</h4>
		<p1>Make the most of your workouts and <br>overall physical fitness with the Fitbit<br>
		heart rate and fitness wristband. <br>See your heart rate 24/7 to get more <br>accurate
		all-day health insights. </p1>
		<br>
		<td>
		<br>
		<h4> Specifications:</h4>
		<ul>
			<li>Battery Life: 5 Days</li>
			<li>Bluetooth Pairing</li>
			<li>Water Resistant</li>
			<li>LED Display</li>
		</ul>
		<form name="form6" method="post" action="lab-12-5-cart-session.php">
		<input type="hidden" name="pid" value="6"> 
		<input type="hidden" name="name" value="Fitbit Heart Rate Wristband"> 
		<input type="hidden" name="category" value="Accessories"> 
		<input type="hidden" name="price" value="69.98"> 
		<input type="submit" name="add" value="Add to Cart">
		</form>
		</td>	
			<tr>
		    <td>
			<img src="images/beats.jpg" alt="Beats Earphones" style="width:180px;height:190px;">
			</td>
		<td>
		<h4>Beats Wireless Earphones</h4>
		<h4>Price: $179.99</h4> 
		<p1>  Make these Beats Earphones your<br> constant companion in quality wireless<br> audio. 
		Sleek, lightweight and compact, <br>easy to take with you wherever you go.</p1>
		<br>
		<td>
		<br>
		<h4> Specifications:</h4>
		<ul>
			<li>High Quality Sound</li>
			<li>Bluetooth Pairing</li>
			<li>Battery Life: 12 Hours</li>
			<li>Tangle Free Cable</li>
		</ul>
		<form name="form7" method="post" action="lab-12-5-cart-session.php">
		<input type="hidden" name="pid" value="7"> 
		<input type="hidden" name="name" value="Beats Wireless Earphones"> 
		<input type="hidden" name="category" value="Accessories"> 
		<input type="hidden" name="price" value="179.99"> 
		<input type="submit" name="add" value="Add to Cart">
		</form>
		</td>
			<tr>
		    <td>
			<img src="images/apple_watch.jpg" alt="Apple Watch" style="width:180px;height:190px;">
			</td>
		<td>
		<h4>Apple Watch</h4>
		<h4>Price: $269.00</h4> 
		<p1>Answer a call from your surfboard.<br> Ask Siri to send a message. Stream<br>
		your favorite songs on your run. And do<br> it all while leaving your phone behind. <br>
		Now you have the freedom to go <br>with just your watch. </p1>
		<br>
		<td>
		<br>
		<h4> Specifications:</h4>
		<ul>
			<li>Battery Life: 18 Hours</li>
			<li>Bluetooth Pairing</li>
			<li>38 mm. Display</li>
			<li>Dual-core Processor</li>
		</ul>
		<form name="form8" method="post" action="lab-12-5-cart-session.php">
		<input type="hidden" name="pid" value="8"> 
		<input type="hidden" name="name" value="Apple Watch"> 
		<input type="hidden" name="category" value="Accessories"> 
		<input type="hidden" name="price" value="269.00"> 
		<input type="submit" name="add" value="Add to Cart">
		</form>
		</td>
		</tr>
		</tbody>
		</table>
	<div class="footer">
		Notice: This is a school assignment, not an actual retail site.  Images and specifications from verizonwireless.com
	</div>
	</body>
</html>