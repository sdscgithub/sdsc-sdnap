<?php
  include_once("db.php");

  $client = $_POST["Client"];
  $rackSpace = $_POST["Rack_Space"];
  $megabit = $_POST["Megabit"];
  $icfee = $_POST["Internet_Connector_Fee"];
  $laborCharge = $_POST["Labor_Charge"];
  $cost = $_POST["Yearly_Cost"];
  $id = $_POST["alterId"];

  // $colums = $mysqli->query("select * from information_schema.columns where table_schema = 'your_DB_name' 
  //  and table_name = 'Your_tablename);

  $mysqli->query("UPDATE `test2` SET Client='$client' WHERE id='$id' AND '$client' <> '' ");
  $mysqli->query("UPDATE `test2` SET `Rack Space`='$rackSpace' WHERE id='$id' AND '$rackSpace' <> '' ");
  $mysqli->query("UPDATE `test2` SET Megabit='$megabit' WHERE id='$id' AND '$megabit' <> '' ");
  $mysqli->query("UPDATE `test2` SET `Internet Connector Fee`='$icfee' WHERE id='$id' AND '$icfee' <> '' ");
  $mysqli->query("UPDATE `test2` SET `Labor Charge`='$laborCharge' WHERE id='$id' AND '$laborCharge' <> '' ");
  $mysqli->query("UPDATE `test2` SET `Yearly Cost`='$cost' WHERE id='$id' AND '$cost' <> '' ");


header( 'Location: http://localhost' ) ;

  ?>
