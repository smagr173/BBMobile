
<?php
//item.php - a sample item class
//Object orientated shopping cart

// item attributes are all protected
class item {
protected $pid;
protected $name;
protected $price;

// Constructor populates the attributes
public function __construct($pid, $name, $price){
$this->pid = $pid;
$this->name = $name;
$this->price = $price;
}

//Method that returns the ID
public function getPID(){
return $this->pid;
}

//Method that returns the name
public function getName(){
return $this->$name;
}

//Method that returns the price
public function getPrice(){
return $this->price;
}

} // End of item class
?>