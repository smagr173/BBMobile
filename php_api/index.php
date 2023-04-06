<!--*************************************************************************//
//																			 //
//  Author:    	 Stephen Magrowski                                           //
//  Major:		 Software Development										 //
//  Class:     	 CSC 242-020                                                 //
//	Professor:   Dr. Tan													 //
//	Created on:  9/10/17													 //
//	Due:		 10/16/17													 //
//  Assignment:  Project 2                                                   //
//  Filename:    index.php                                                   //
//  Purpose:     The purpose of this program is to create a website for      //
//				 an online shopping catalog using HTML and CSS. This file    //
//				 is the intro page containing information on the company     //
//				 and links to navigate to different pages.                   //
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
		<div class="nav">		<!-- Navigation for two categories -->
		<a href="index.php">Home</a>
		| Category:
		<a href="smartphones.php">Smartphones</a>
		-- or --
		<a href="accessories.php"> Accessories</a>
		 | 
		<a href="lab-12-5-cart-session.php"> Cart</a>
		
	<table class="home">		<!-- Select the category to browse -->
		<tbody>
			<tr>
				<td>
					<a href="smartphones.php">
						<img src="images/smartphones.jpg" alt="Browse Smartphones" style="width:285px;height:210px;">
					</a>
					<br><a href="smartphones.php">View Smartphones</a>
				</td>
				<td>
					<a href="accessories.php">
						<img src="images/accessories.jpg" alt="Browse Accessories" style="width:285px;height:210px;">
					</a>
					<br><a href="accessories.php">View Accessories</a>
				</td>
			</tr>
		</tbody>
	</table>
		<h1> 
			Our Mission
		</h1>
		<p1>
			Here at Cells 4 Less we're dedicated to providing our customers with the 
			smartphone products they want with great service. Not only do we guarantee 
			you'll get the lowest price, but also your satisfaction. We carry the latest
			smartphones and accessories for all your cellphone needs, and at a great price!
			Simply choose from the category above to view our smartphones and accessories,
			then add it to your cart.
		</p1>
		<h1> 
			Our Products
		</h1>
		<p1>
			You'll find the newest smartphones and accessories to stand out or to make your
			life easier. From the latest technology from Apple or Samsung theres something
			for everyone at Cells 4 Less. Whether you need a fitness tracker or a virtual
			reality headset we have you covered. Our warehouses are always stocked so
			you never have to worry about waiting for inventory. Our products also make
			great gifts, so check out our sales during the holiday season.
		</p1>
		<h1>
			About the Site
		</h1>
		<p1>
			This website was created by Stephen Magrowski using HTML, CSS, and PHP for Dr. Tan's web programming course. The purpose was to create a platform for customers
			to browse and add items to their shopping cart.
		</p1>
		<div class="footer">
			Notice: This is a school assignment, not an actual retail site. Images and specifications from verizonwireless.com
		</div>
	</body>
</html>