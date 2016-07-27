<?php
  include_once("db.php");

  $client = $_POST["Client"];
  $rackSpace = $_POST["Rack_Space"];
  $megabit = $_POST["Megabit"];
  $icfee = $_POST["Internet_Connector_Fee"];
  $laborCharge = $_POST["Labor_Charge"];
  $cost = $_POST["Yearly_Cost"];

  $mysqli->query("INSERT INTO `test2` VALUES('$client', '$rackSpace', '$megabit', '$icfee', '$laborCharge', '$cost', DEFAULT)");

header( 'Location: http://localhost' ) ;

  ?>
