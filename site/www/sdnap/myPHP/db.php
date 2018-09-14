<?php
/*
File: dp.php
Purpose: connect to the sql server
Description: connect to the sql server
*/

  $db_host   = $_SERVER["MYSQL_HOST"];
  $db_user   = $_SERVER["MYSQL_USER"];
  $db_passwd = $_SERVER["MYSQL_PASSWORD"];

  /* The page that the user will be directed to after adding,
  editing or deleting */
  //$redirectPage = "Location: https://holonet.sdsc.edu/sdnap/";
  //$redirectPage = "Location: https://maersk.sdsc.edu/sdnap/";
  $redirectPage = "Location: https://sdnap.sdsc.edu/";
  /* Holds information on data in the rows */
  $primaryTable = "user_data";
  /* Holds informatin for dropdown menus */
  $secondaryTable = "select_options";
  /* Connect to db via k8s service in jx namespace */
  /* $mysqli = new mysqli( "sdnapdb.jx.svc.cluster.local", "mysql", "password","sdnapdb");
   */
  $mysqli = new mysqli( $db_host, $db_user, $db_passwd); 

 ?>

