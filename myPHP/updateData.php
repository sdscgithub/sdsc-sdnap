<?php
  include_once("db.php");
  //TODO Change the form that calls this method so that the data fields are filled out with the previouos info. Right now it is impossible to delete a filed with edit
  $id = $_POST["alterId"];

                foreach($_POST as $key=>$value){
                  echo "$key=$value\n";
                  if($key != 'alterId'){
                    $keyMod = str_replace('_', ' ', $key);
                      $mysqli->query("UPDATE `test2` SET `$keyMod`='$value' WHERE id=$id");
                  }
                }



  header( 'Location: http://localhost' ) ;

  ?>
