<?php
  include_once("db.php");

  $mysqli->query("ALTER TABLE `test2` DROP COLUMN $_POST[delCol]");

  header( 'Location: http://localhost' ) ;

  ?>
