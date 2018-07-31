<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $userID = $_POST['userID'];
  $groupID = $_POST['groupID'];

  $items = getItemsInGroup($userID, $groupID);
  echo(getJSON($items, true));
}

?>
