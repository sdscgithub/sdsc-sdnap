<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $userID = $_POST['userID'];

  $groups = getGroupsOfUser($userID);
  echo(getJSON($groups, true));
}
?>
