<?php
  include_once("db.php");

  $mysqli->query("ALTER TABLE `test2` ADD `$_POST[col]` $_POST[DataType]");


  header( 'Location: http://localhost' ) ;

  ?>
