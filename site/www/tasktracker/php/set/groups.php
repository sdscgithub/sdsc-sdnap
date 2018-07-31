<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $userID = $_POST['userID'];
  $groups = json_decode($_POST['data'], true);

  $success = true;
  $ids = array();
  foreach($groups as $group){
    $returnCode = setGroup($userID, $group);
    if($returnCode == -1){
      $success = false;
    }
    array_push($ids, $returnCode);
  }

  echo(getJson($ids, $success));
}

function setGroup($userID, $group){
  if(groupExists($userID, $group['id'])){
    return updateGroup($userID, $group);
  }else{
    return insertGroup($userID, $group);
  }
}

function insertGroup($userID, $group){
  global $GROUPS_TABLE;

  $groupName = $group['name'];
  $groupID   = $group['id'];
  $position  = $group['position'];
  $isUnsorted  = $group['isUnsorted'];

  $tasktrackerDB = connectToDB();

  $stmt = $tasktrackerDB->prepare("INSERT INTO $GROUPS_TABLE (userID, groupName, position, isUnsorted) VALUES (?,?,?,?)");
  $stmt->bind_param('isii', $userID, $groupName, $position, $isUnsorted);

  $success = $stmt->execute();
  $insertID = $tasktrackerDB->insert_id;
  $tasktrackerDB->close();

  if($success == 1){
    return $insertID;
  }else{
    return (-1);
  }
}

function updateGroup($userID, $group){
  global $GROUPS_TABLE;

  $groupName = $group['name'];
  $groupID   = $group['id'];
  $position  = $group['position'];
  $isUnsorted  = $group['isUnsorted'];

  $tasktrackerDB = connectToDB();

  $stmt = $tasktrackerDB->prepare("UPDATE $GROUPS_TABLE SET userID = (?), groupName = (?), position = (?), isUnsorted = (?) WHERE groupID = (?);");
  $stmt->bind_param('isiii', $userID, $groupName, $position, $isUnsorted, $groupID);
  $success = $stmt->execute();
  $tasktrackerDB->close();
  return $groupID;
}

?>
