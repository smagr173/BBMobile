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
//  Filename:    lab-12-3-shoppingcart-session.php                           //
//  Purpose:     This file creates a class ShoppingCart to store the         //
//				 product in the cart. It adds the item through its product   //
//				 ID and allows items to be updated or removed. The number    //
//				 of items in the cart is also updated and stored.            //
//**************************************************************************-->

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
        $pid = $item->getPID(); 
     
        // Throw an exception if there's no pid 
        if (!$pid) throw new Exception('The cart requires items with unique ID values.'); 
        // Add or update 
        if (isset($this->items[$pid])) { 
            $this->updateItemByPId($pid, $this->items[$pid]['qty'] + 1); // update              
        } else { 
            $this->items[$pid] = array('item' => $item, 'qty' => 1); // add new item 
            // Use product id as the key for items array - associate array 
            // the first element:item is an object, the second element:qty is an integer 
            // var_dump($this->items['1']['item']->getName()); // keep 
            // var_dump($this); 
        } 
         
        return $this;  // so the cart page can serialize the object for session  
    } // End of addItem() method. 

    // Changes an item already in the cart by pid 
    public function updateItemByPId($pid, $qty) { 
        // Delete or update accordingly, type of $qty is string 
        if ($qty === 0 || $qty == '0')  
            $this->deleteItem($pid); 
        // elseif ( ($qty > 0) && ($qty != $this->items[$pid]['qty'])) { 
        else { // display whatever the user entered so the user can fix the problem 
            $this->items[$pid]['qty'] = $qty;  
        } 

        return $this; // so the cart page can serialize the object for session  
    } // End of updateItemByPId() method 

    // Removes an item from the cart 
    public function deleteItem($itemPID) {         
        // Remove item according to its pid 
        if (isset($this->items[$itemPID])) { 
            unset($this->items[$itemPID]); 
        } 
         
        return $this; // so the cart page can serialize the object for session  
    } // End of deleteItem() method 
     
    // Cout the length of the cart array, different items count 
    public function count() { 
        return count($this->items); 
    } 
     
    // count the total number of all items  
    public function countItemsQty() { 
        $count = 0; 
        foreach ($this->items as $arr) {  
            // $item = $arr['item']; // Get the item object 
            if (valid_qty($arr['qty']))  
                // add the qty only it is valid integer 
                $count += $arr["qty"]; 
        } 
        return $count; 
    }     
     
    // Display the cart content with a remove column 
    public function PrintShoppingCart() 
    { 
        // if cart is not empty then create a table with 5 columns:  
        // Items, Price, Qty, Subtotal and remove 
         
        if ($this->count() > 0) 
        { 
            // shopping cart display with many forms for demonstartion w/o javascript 
            echo '<table id="cart" cellspacing="0" align="center">'; 
            echo '<tr><th>Items</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>&nbsp;</th></tr>'; 
            $total = 0.00; 
             
            // var_dump ($this->items['1']); 
            // echo '*' . $this->items['1']['item']->getName() . '<br>'; 
            foreach ($this->items as $arr) { 
                $item = $arr['item']; // Get the item object 
                echo '<tr><td width="200px">' . $item->getName() . '</td>'; 
                echo '<td>$' . $item->getPrice() . '</td>'; 
                // if page only has one form, need to use qty[] 
                //     echo '<td><form><input type="text" size="1" name="qty[]" maxlength="3" value="' . $arr['qty'] . '"</input>'; 
         
                // for demonstration w/o javascript, created many forms within the page 
                // group update and remove together with qty to be in one form 
                echo '<td width="150px"><form>'; 
                echo '<input type="text" size="1" name="qty" maxlength="3" value="' . $arr['qty'] . '"</input>'; 
                echo '<input type="hidden" name="pid" value="' . $item->getPID() . '">'; 
                echo '<input type="submit" class="btn-link" name="update" value="update">'; 
                echo '<input type="submit" class="btn-link" name="remove" value="remove">';                 
                echo '</form></td>'; 
                 
                // you should check for user's inputs to be digits before using it 
                $subtotal =  $item->getPrice() * $arr['qty']; 
                echo '<td>$' . number_format($subtotal, 2). '</td>';                 
                echo '</tr>'; 
                $total += $subtotal; 
            } // end for 

            echo '<tr><td colspan="2" class="last-row">&nbsp;</td><td class="last-row"><b>Total:</b></td><td class="last-row">$' . number_format($total, 2) .'</td>'; 
            echo '<td class="last-row">&nbsp;</td></tr></table>'; 
        } 
        else // shopping cart is empty 
            echo '<div style="text-align:center">[ Empty ]<br></div>'; 
    } // end Display 


} // End of ShoppingCart class 

// verified the input number for quantity 
function valid_qty($qty) 
{ 
    // $checkQty = '/^[0-9]{1,}$/'; 
    $checkQty = '/^[0-9]+$/'; 

    if (preg_match($checkQty, $qty)) 
        return true; 
    else  
        return false; 
} 

?>