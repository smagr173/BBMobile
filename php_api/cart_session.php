<?php # ShoppingCart.php  

class ShoppingCart { 

    // Array stores the list of items in the cart 
    protected $items; // property  
     
    // Constructor just sets the object up for usage 
    function __construct() { 
        $this->items = array(); // initialized 
    } 

    public function getItems() { 
        return $this->items; 
    }  

    // Returns a Boolean indicating if the cart is empty: 
    public function isEmpty() { 
        return empty($this->items); 
    } 

    // Adds a new item to the cart 
    public function addItem(Item $item) { 
        // Need the item's pid 
        $name = $item->getName(); 

        // Add or update 
        if (isset($this->items[$name])) { 
            $this->updateItemByPId($name, $this->items[$name]['quantity'] + 1); // update              
        } else { 
            $this->items[$name] = array('item' => $item, 'quantity' => 1); // add new item 
            // Use product id as the key for items array - associate array 
            // the first element:item is an object, the second element:qty is an integer 
            // var_dump($this->items['1']['item']->getName()); // keep 
            // var_dump($this); 
        } 
         
        return $this;  // so the cart page can serialize the object for session  
    } // End of addItem() method. 

    // Changes an item already in the cart by pid 
    public function updateItemByPId($name, $quantity) { 
        // Delete or update accordingly, type of $qty is string 
        if ($quantity === 0 || $quantity == '0')  
            $this->deleteItem($name); 
        // elseif ( ($qty > 0) && ($qty != $this->items[$pid]['qty'])) { 
        else { // display whatever the user entered so the user can fix the problem 
            $this->items[$name]['quantity'] = $quantity;  
        } 

        return $this; // so the cart page can serialize the object for session  
    } // End of updateItemByPId() method 

    // Removes an item from the cart 
    public function deleteItem($itemName) {         
        // Remove item according to its pid 
        if (isset($this->items[$itemName])) { 
            unset($this->items[$itemName]); 
        } 
         
        return $this; // so the cart page can serialize the object for session  
    } // End of deleteItem() method 
    
    public function count() { 
        return count($this->items); 
    } 
     

    public function sendCart() 
    { 
         $itemCount = 0;
            foreach ($this->items as $arr) { 
                $item = $arr['item']; // Get the item object
		$itemArr['name'] = $item->getName();
		$itemArr['price'] = $item->getPrice();
		//$nameArr[] = $item->getName();
		//$priceArr[] = $item->getPrice();
		//$qtyArr[] = $item->getQuantity();
		
		//$itemCount = $itemCount + 1;
            } // end for 
	    //$msgs[] = $itemArr2;
	    //$msgs['name'] = $nameArr;
	   // $msgs['price'] = $priceArr;
	   // $msgs['quantity'] = $qtyArr;
	   $msgs = $itemArr;
	    //$msgs['succ'] = "Success";
	echo json_encode($msgs);
    }

} // End of ShoppingCart class 


?>
