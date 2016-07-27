<?php
  include_once("db.php");
  $id = $_POST["deleteId"];
  //mysql_query("DELETE FROM `test2` WHERE id=$id");
  $mysqli->query("DELETE FROM `test2` WHERE id=$id");
  header( 'Location: http://localhost' );

  ?>
