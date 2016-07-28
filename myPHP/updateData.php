<?php
  include_once("db.php");

/*
  $client = $_POST["Client"];
  $rackSpace = $_POST["Rack_Space"];
  $megabit = $_POST["Megabit"];
  $icfee = $_POST["Internet_Connector_Fee"];
  $laborCharge = $_POST["Labor_Charge"];
  $cost = $_POST["Yearly_Cost"];
  */
  $id = $_POST["alterId"];


//   mysql_query("UPDATE `test2` SET Client='$client', `Rack Space`='$rackSpace', Megabit='$megabit', `Internet Connector Fee`='$icfee',
//                `Labor Charge`='$laborCharge', `Yearly Cost`='$cost' WHERE id='$id' ");

//TODO this will need to be updated when data field names are changed
                foreach($_POST as $key=>$value){
                  if($key != 'id'){
                    $keyMod = str_replace('_', ' ', $key);
                    $mysqli->query("UPDATE `test2` SET `$keyMod`='$value' WHERE id=$id");
                  }
                }



header( 'Location: http://localhost' ) ;

  ?>
