<?php
/*
File: dp.php
Purpose: connect to the sql server
Description: connect to the sql server
*/

  $db_host   = getenv('SQL_HOST');
  $db_user   = getenv('SQL_USER');
  $db_passwd = getenv('SQL_PASSWORD');
  $db_name   = getenv('SQL_DATABASE');

  /* The page that the user will be directed to after adding,
  editing or deleting */
  //$redirectPage = "Location: https://holonet.sdsc.edu/sdnap/";
  $redirectPage = "Location: https://sdnap.sdsc.edu/";
  /* Holds information on data in the rows */
  $primaryTable = "user_data";
  /* Holds informatin for dropdown menus */
  $secondaryTable = "select_options";
  /* Connect to db via k8s service in jx namespace */
  /* $mysqli = new mysqli( "sdnapdb.jx.svc.cluster.local", "mysql", "password","sdnapdb");
   */
  $mysqli = new mysqli( $db_host, $db_user, $db_passwd, $db_name); 

 ?>

