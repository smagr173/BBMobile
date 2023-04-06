
<?
try  {
	 // Create some items;
	 require('item.php');
	 
	 $items = array();
	 // Write code to add one item at a time to the array
	 // add total of a 3 item objects to the $items array
	 
	 $items[0]= new item('WI36','clock','23.50');
	 
	 
	 echo "Structure of items array: <br>";
	 echo '<pre>';  // preserves spaces and line breaks
	 print_r($items); // more humans readable form
	 echo '</pre>';
	 
	 // format items with html tags
	 echo "<hr><h2>Added " . count($items) . " items</h2>"
	 echo '<table><tr><th>Fid</th><th>Name</th><th>Price</th></tr>';
	 for ($x = 0; $x < count($items); $x++) {
		 // output items array
		 echo "<tr><td>" . $items[$x]->get_PID(). "</td>";
		 echo get_name
		 echo get_price
		 "</td></tr>"
		 
		 
		 
	 }
	 echo '</table>';
	 
}	catch (Exception $e) {
		// Handle the exception
		
}
?>
</body>