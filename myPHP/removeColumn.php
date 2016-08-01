<?php
/*
This file should not be needed anymore since deletion is now done by deleteData.php
*/

  /* Connect to the server */
  include_once("db.php");

  $mysqli->query("ALTER TABLE `test2` DROP COLUMN `$_POST[delCol]`");

  header( 'Location: http://localhost' ) ;

  ?>
