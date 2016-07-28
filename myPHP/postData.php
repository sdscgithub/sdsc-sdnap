<?php
  include_once("db.php");

  /* Make a new row and only fill in its id value */
  $mysqli->query("INSERT INTO `test2` (id) VALUES(DEFAULT)");

  /* Get the id of the row that was just added */
  $id = $mysqli->insert_id;

  //TODO this will need to be updated when data field names are changed
  foreach($_POST as $key=>$value){
    $keyMod = str_replace('_', ' ', $key);
    $mysqli->query("UPDATE `test2` SET `$keyMod`='$value' WHERE id=$id");
  }


/*
  $client = $_POST["Client"];
  $rackSpace = $_POST["Rack_Space"];
  $megabit = $_POST["Megabit"];
  $icfee = $_POST["Internet_Connector_Fee"];
  $laborCharge = $_POST["Labor_Charge"];
  $cost = $_POST["Yearly_Cost"];
  */

  //mysql_query("INSERT INTO `test2` VALUES('$client', '$rackSpace', '$megabit', '$icfee', '$laborCharge', '$cost', DEFAULT)");
  //$mysqli->query("INSERT INTO `test2` VALUES('$client', '$rackSpace', '$megabit', '$icfee', '$laborCharge', '$cost', DEFAULT)");

  header( 'Location: http://localhost' ) ;

  ?>
