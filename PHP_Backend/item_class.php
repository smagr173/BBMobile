<?php  
class Item {
    // Item attributes are all protected: 
    protected $name; 
    protected $quantity; 
    protected $price; 
     
    // Constructor populates the attributes: 
    public function __construct($name, $quantity, $price) { 
        $this->name = $name; 
        $this->quantity = $quantity; 
        $this->price = $price; 
    } 
     
    // Method that returns the ID 
    public function getName() { 
        return $this->name; 
    } 

    // Method that returns the name 
    public function getQuantity() { 
        return $this->quantity; 
    } 

    // Method that returns the price 
    public function getPrice() { 
        return $this->price; 
    } 

} // End of Item class 
?>