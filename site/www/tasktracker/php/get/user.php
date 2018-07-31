<?php

include_once("../utility.php");
//include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');


  $username = $_POST['username'];

  $user = getUser($username);
  echo(getJSON($user, true));
}
?>
