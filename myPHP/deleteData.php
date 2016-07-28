<?php
  include_once("db.php");
  $id = $_POST["deleteId"];
  $mysqli->query("DELETE FROM `test2` WHERE id=$id");
  header( 'Location: http://localhost' );

  ?>
