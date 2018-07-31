<?php
include_once("config.php");

/***** Access *****/

function getUser($username){
  global $USERS_TABLE;

  $tasktrackerDB = connectToDB();

  $queryString = "SELECT * FROM $USERS_TABLE WHERE username = (?) LIMIT 1;";
  $stmt = $tasktrackerDB->prepare($queryString);
  $stmt->bind_param('s', $username);
  $success = $stmt->execute();

  $rowObject = getRowsFromQuery($stmt);

  $tasktrackerDB->close();

  if($rowObject['row_count'] == 0){
    return null;
  }else{
    return $rowObject['rows'][0];
  }
}

function getGroup($userID, $groupID){
  global $GROUPS_TABLE;

  $tasktrackerDB = connectToDB();

  $queryString = "SELECT * FROM $GROUPS_TABLE WHERE groupID = (?) && userID = (?) LIMIT 1;";
  $stmt = $tasktrackerDB->prepare($queryString);
  $stmt->bind_param('ii', $groupID, $userID);
  $success = $stmt->execute();

  $rowObject = getRowsFromQuery($stmt);

  $tasktrackerDB->close();

  if($rowObject['row_count'] == 0){
    return null;
  }else{
    return $rowObject['rows'][0];
  }
}

function getGroupsOfUser($userID){
  global $GROUPS_TABLE;

  $tasktrackerDB = connectToDB();

  $queryString = "SELECT * FROM $GROUPS_TABLE WHERE userID = (?)";
  $stmt = $tasktrackerDB->prepare($queryString);
  $stmt->bind_param('i', $userID);
  $success = $stmt->execute();

  $rowObject = getRowsFromQuery($stmt);

  $tasktrackerDB->close();
  return $rowObject;
}

function getItem($userID, $itemID){
  global $ITEMS_TABLE;
  global $itemsColumns;

  $tasktrackerDB = connectToDB();

  $queryString = "SELECT * FROM $ITEMS_TABLE WHERE itemID = (?) && userID = (?) LIMIT 1;";
  $stmt = $tasktrackerDB->prepare($queryString);
  $stmt->bind_param('si', $itemID, $userID);
  $success = $stmt->execute();

  $rowObject = getRowsFromQuery($stmt);

  $tasktrackerDB->close();

  if($rowObject['row_count'] == 0){
    return null;
  }else{
    return $rowObject['rows'][0];
  }
}

function getItemsInGroup($userID, $groupID){
  global $ITEMS_TABLE;
  global $itemsColumns;

  $tasktrackerDB = connectToDB();

  $queryString = "SELECT * FROM $ITEMS_TABLE WHERE groupID = (?) && userID = (?)";
  $stmt = $tasktrackerDB->prepare($queryString);
  $stmt->bind_param('ii', $groupID, $userID);
  $success = $stmt->execute();

  $itemObjects = getRowsFromQuery($stmt);

  $tasktrackerDB->close();
  return $itemObjects;
}

function genericDelete($userID, $tableName, $columnValue){
  global $GROUPS_TABLE;
  global $ITEMS_TABLE;

  $tasktrackerDB = connectToDB();
  if($tableName == $GROUPS_TABLE){
    $stmt = $tasktrackerDB->prepare("DELETE FROM $GROUPS_TABLE WHERE userID = (?) && groupID = (?)");
    $stmt->bind_param('ii', $userID, $columnValue);
    $success = $stmt->execute();
  }else if($tableName == $ITEMS_TABLE){
    $stmt = $tasktrackerDB->prepare("DELETE FROM $ITEMS_TABLE WHERE userID = (?) && itemID = (?)");
    $stmt->bind_param('is', $userID, $columnValue);
    $success = $stmt->execute();
  }else{
    $success = false;
  }

  $tasktrackerDB->close();

  if($success == 1){
    return  (1);
  }else{
    return (-1);
  }
}

function userExists($username){
  $user = getUser($username);
  return $user != null;
}

function groupExists($userID, $groupID){
  $group = getGroup($userID, $groupID);
  return $group != null;
}

function itemExists($userID, $itemID){
  $item = getItem($userID, $itemID);
  return $item != null;
}

function getRowsFromQuery($stmt){

  $md = $stmt -> result_metadata();
  $fields = $md -> fetch_fields();
  $result = new stdClass();
  $params = array(); // Array of fields passed to the bind_result method
  foreach($fields as $field) {
      $result -> {$field -> name} = null;
      $params[] = &$result -> {$field -> name};
  }
  call_user_func_array(array($stmt, 'bind_result'), $params);


  $rows = array();
  while($stmt->fetch()){
    $obj;
    for ($i = 0; $i < sizeOf($fields); $i++) {
      $columnName = $fields[$i]->name;
      $obj[$columnName] = $params[$i];
    }
    array_push($rows, $obj);
  }

  $retVal;
  $retVal["row_count"] = sizeOf($rows);
  $retVal["rows"] = $rows;

  return $retVal;
}

function getReturnObj($obj, $success){
  $returnObj = new stdClass();
  $returnObj->success = $success;
  $returnObj->data = $obj;

  return $returnObj;
}

function getJSON($obj, $success){
  return json_encode(getReturnObj($obj, $success));
}

function connectToDB(){
  global $SQL_HOST;
  global $SQL_USERNAME;
  global $SQL_PASSWORD;
  global $SQL_DATABASE;

  return new mysqli( $SQL_HOST, $SQL_USERNAME, $SQL_PASSWORD, $SQL_DATABASE);
}

?>
