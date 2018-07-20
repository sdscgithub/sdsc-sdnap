<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $userID = $_POST['userID'];
  $items = json_decode($_POST['data'], true);

  $success = true;
  foreach($items as $item){
    $returnCode = setItem($userID, $item);
    if($returnCode == -1){
      $success = false;
    }
  }

  echo(getJSON(null, $success));
}

function setItem($userID, $item){
  if(itemExists($userID, $item['id'])){
    return updateItem($userID, $item);
  }else{
    return insertItem($userID, $item);
  }
}

function insertItem($userID, $item){
  global $ITEMS_TABLE;

  $itemID   = $item['id'];
  $groupID  = $item['groupID'];
  $itemType = $item['type'];
  $position = $item['position'];
  $tasktrackerDB = connectToDB();

  $stmt = $tasktrackerDB->prepare("INSERT INTO $ITEMS_TABLE (itemID, userID, groupID, itemType, position) VALUES (?,?,?,?,?)");
  $stmt->bind_param('siiii', $itemID, $userID, $groupID, $itemType, $position);
  $success = $stmt->execute();
  $tasktrackerDB->close();

  if($success == 1){
    return ($itemID);
  }else{
    return (-1);
  }
}

function updateItem($userID, $item){
  global $ITEMS_TABLE;

  $itemID   = $item['id'];
  $groupID  = $item['groupID'];
  $itemType = $item['type'];
  $position = $item['position'];
  $tasktrackerDB = connectToDB();

  $stmt = $tasktrackerDB->prepare("UPDATE $ITEMS_TABLE SET groupID = (?), itemType = (?), position = (?) WHERE userID = (?) && itemID = (?)");
  $stmt->bind_param('iiiis', $groupID, $itemType, $position, $userID, $itemID);
  $success = $stmt->execute();
  $tasktrackerDB->close();
  return ($itemID);
}
?>
