<?php
/*
File: dp.php
Purpose: connect to the sql server
Description: connect to the sql server
*/

  /* The page that the user will be directed to after adding,
  editing or deleteing */
  //$redirectPage = "Location: https://holonet.sdsc.edu/sdnap/";
  $redirectPage = "Location: https://holonet.sdsc.edu/sdnap/";
  /* Holds information on data in the rows */
  $primaryTable = "user_data";
  /* Holds informatin for dropdown menus */
  $secondaryTable = "select_options";
  $mysqli = new mysqli( "localhost", "sdnapdbuser", '_Apm$wsM4',"sdnapdb");
 ?>
