<!DOCTYPE html>
<html>

<?php

   /* These filds should no longer be needed */
  //$FIELDS = array("Client","Rack Space", "Megabit", "Internet Connector Fee", "Labor Charge", "Yearly Cost");
  //$NUM_FIELDS = 6;

  /* Connect to the server */
  include_once("myPHP/db.php");

/* Add links to css and javascript files */
echo '<head>
        <link rel="stylesheet" type="text/css" href="css/custom.css"/>
        <link rel="stylesheet" type="text/css" href="css/myStyle.css"/>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.6/jqc-1.12.3/dt-1.10.12/af-2.1.2/b-1.2.1/b-colvis-1.2.1/b-print-1.2.1/cr-1.3.2/fc-3.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.css"/>
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.6/jqc-1.12.3/dt-1.10.12/af-2.1.2/b-1.2.1/b-colvis-1.2.1/b-print-1.2.1/cr-1.3.2/fc-3.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.js"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script src="js/test.js"></script>
    </head>';

/* Add bootstrap styling */
echo `<body><div class="container">`;

/* Adds the buttons for "Add", "Delete", "Edit" and "Add Column" */
echo '<div class = "btn-toolbar">
      <button class="add btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalNorm">
       Add
     </button>

     <form id="myFormDel" action="/myPHP/deleteData.php" method="post" onsubmit="return confirmDeletion()">
     <input name="deleteId" id="deleteId" type="int" hidden="true">
     <input name="itemToDelete" id="itemToDelete" type="string" hidden="true">
     <button disabled id="deleteButton" class="delete btn btn-danger btn-sm">Delete</button> </form>
     <button disabled onclick="addValues()" id="editButton" class="edit btn btn-warning btn-sm" data-toggle="modal" data-target="#edit">
      Edit
    </button>
    <button class="add btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalNormCol">
     Add Column
   </button>
     </div>';


/* Add bootstrap stylized popup window for adding rows using the "Add" button */
echo '<!-- Modal -->
  <div class="modal fade" id="myModalNorm" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Add New Entry
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="myForm" action="myPHP/postData.php" method="post">';

                $sql = "SHOW COLUMNS FROM test2";
                /* Query the database for all columns in test2 */
                $result = $mysqli->query($sql);
                /* Traverse the columns */
                while($row = $result->fetch_array()){
                  $dataType = "text";
                  /* Do not do anything with the id field */
                  if($row['Field'] != 'id'){
                    /* Update dataType to reflect the type of data in each column */
                    switch($row['Type']){
                      case "int(11)":
                        $dataType = "number";
                        break;
                      case "date":
                        $dataType = "date";
                        break;
                      case "varchar(50)":
                        $dataType = "select";
                      case "text":
                        break;
                    }

                    /* Add a dropdown menu if needed */
                    if($dataType == "select"){
                      echo '<div class="form-group">';
                      echo '<label for=',$row['Field'],"input>",$row['Field'],'</label>';

                      echo  '<select id="addSelect" class="form-control" name="',$row['Field'],'">';
                      $notWhiteSpace = rtrim(ltrim($row['Field']));
                      $data = $mysqli->query("SELECT * FROM `select_options` WHERE column_name='$notWhiteSpace'");
                      $obj = $data->fetch_row();
                      $dropdownOptions = explode(",", $obj[0]);
                      foreach($dropdownOptions as $value){
                        echo   '<option>', "$value", '</option>';
                      }
                      echo  '</select> <br/>';

                      echo '</div>';
                    /* Add a label and input box */
                    }else{
                    echo '<div class="form-group">';
                    echo '<label for=',$row['Field'],"input>",$row['Field'],'</label>';
                    echo '<input type="',$dataType ,'"', ' name="', $row['Field'],'" class="form-control" id =',$row['Field'],'input placeholder=""','/>';
                    echo '</div>';
                  }
                  }
                }
            /* End styling of popup window */
            echo '<div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </div></form>';
            echo '</div>';

            echo '<!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
            </div>
        </div>
    </div>
</div>';

/* Add bootstrap stylized popup window for adding columns using the "Add Column" button */
echo '<!-- Modal -->
<div class="modal fade" id="myModalNormCol" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Add New Entry
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="addColumnForm" action="myPHP/addColumn.php" method="post">';
                    $newCol = "New Column Name";
                    $dataType = "Input Type";

                    echo '<div class="form-group">';
                    /* Label */
                    echo '<label for=', "$newCol","input>","$newCol",'</label>';
                    /* Text entry box */
                    echo '<input name="', "col",'" class="form-control" id =',$newCol,'input placeholder=""','/>';
                    /* Label for  type of data */
                    echo '<label for=', "DataType","input>","$dataType",'</label>';
                    /* Dropdown menu for types of data */
                    echo  '<select id="dataTypeSelect" onchange="checkOption(id)" class="form-control" name="DataType">
                           <option value="TEXT">Text</option>
                           <option value="varchar(50)">Dropdown</option>
                           <option value="INT">Numeric</option>
                           <option "DATE">Date</option>
                           </select> <br/>';
                    /* Hidden label and text fiedl that are displayed if "Dropdown" option is chosen */
                    echo '<label id="dropdownLabel" for=', "dropdownText","input hidden='true'>","* Enter options for the dropdown menu seperated by commas",'</label>';
                    echo '<input id="dropdownText" type=\'hidden\' name="', "options",'" class="form-control" id =',$newCol,'input placeholder=""','/>';

                    /* End styling of popup window */
                    echo '</div>';
            echo '</div>';

            echo '<!-- Modal Footer -->
            <div class="modal-footer">',
            '<div>
             <button type="submit" class="btn btn-default">Submit</button>
           </div></form>',
                '<button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
            </div>
        </div>
    </div>
</div>';

/* this should not be needed anymore */
echo '<!-- Modal -->
<div class="modal fade" id="myModalNormColDelete" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Select Column to Remove
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="removeColumnForm" action="myPHP/removeColumn.php" method="post">';

                echo '<select class="form-control" name="delCol">';
                echo '<option> Select Column </option>';
                    $newCol = "Delete Column";
                    $sql = "SHOW COLUMNS FROM test2";
                    $result = $mysqli->query($sql);
                    while($row = $result->fetch_array()){
                      if($row['Field'] != 'id'){
                        echo '<option>', $row['Field'],'</option>';
                      }
                    }

            echo '</select></div>';

            echo '<!-- Modal Footer -->
            <div class="modal-footer">',

                '<div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </div></form>',

                '<button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
            </div>
        </div>
    </div>
</div>';


/* Add bootstrap stylized popup window for editting rows using the "Edit" button */
echo '<!-- Modal -->
 <div class="modal fade" id="edit" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Edit Entry
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="myEdit" action="myPHP/updateData.php" method="post">
                <input name="alterId" id="alterId" type="int" hidden="true">';

                $sql = "SHOW COLUMNS FROM test2";
                /* Query the database for all columns in test2 */
                $result = $mysqli->query($sql);
                $counter = 0;
                /* Traverse the columns */
                while($row = $result->fetch_array()){
                  $dataType = "text";
                  /* Do not do anything with the id field */
                  if($row['Field'] != 'id'){
                    /* Update dataType to reflect the type of data in each column */
                    switch($row['Type']){
                      case "int(11)":
                        $dataType = "number";
                        break;
                      case "date":
                        $dataType = "date";
                        break;
                      case "varchar(50)":
                        $dataType = "select";
                      case "text":
                        break;
                    }

                    /* Add a dropdown menu if needed */
                    if($dataType == "select"){
                      echo '<div class="form-group">';
                      echo '<label for=',$row['Field'],"input>",$row['Field'],'</label>';
                      echo  '<select id="addSelect" class="form-control inputField" name="',$row['Field'],'">';
                      $notWhiteSpace = rtrim(ltrim($row['Field']));
                      $data = $mysqli->query("SELECT * FROM `select_options` WHERE column_name='$notWhiteSpace'");
                      $obj = $data->fetch_row();
                      $dropdownOptions = explode(",", $obj[0]);
                      foreach($dropdownOptions as $value){
                        echo   '<option>', "$value", '</option>';
                      }
                      echo  '</select> <br/>';

                      echo '</div>';
                    /* Add a label and input box */
                    }else{
                    echo '<div class="form-group">';
                    echo '<label for=',$row['Field'],"input>",$row['Field'],'</label>';
                    echo '<input value="', "",'" type="',$dataType ,'"', ' name="', $row['Field'],'" class="form-control inputField" id =',$row['Field'],'input placeholder=""','/>';
                    echo '</div>';
                  }
                  }
                  $counter = $counter = 1;
                }
            /* End styling of popup window */
            echo '<div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </div></form>';
            echo '</div>';

            echo '<!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
            </div>
        </div>
    </div>
</div>';


echo '<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <thead class="thead-inverse">
        <tr>';
/* Generate table headers */
    $data = $mysqli->query("SELECT * FROM `test2` WHERE 1");
    while($obj = $data->fetch_field()){
      if($obj->name != "id")
      echo '<th onclick="highlightCol(id)" id="', str_replace(' ', '_', $obj->name),'">', $obj->name, '</th>';
    }

    echo `<th style="width: 36px;"></th>`;

echo  '</tr></thead>';

/*Genearte table footer*/
echo '<tfoot><tr>';
$data = $mysqli->query("SELECT * FROM `test2` WHERE 1");
while($obj = $data->fetch_field()){
  if($obj->name != "id")
   echo '<th>', $obj->name, '</th>';
}

echo  '</tr></tfoot>';

/* Generate table body */
echo '<tbody>';

/* Query "test2" for all rows */
$data = $mysqli->query("SELECT * FROM `test2` WHERE 1");
  /* Keep track of what row it is on */
  $rowNum = 0;
  /* The same row is fetched twice. The first as an array that is accessed by numeric index
     and then as an array accessed with strings */
  while($stuff = $data->fetch_row()){
    $rowNum = $rowNum + 1;
    $data->data_seek($rowNum - 1);
    /* Fetch the array the second time */
    $stuff2 = $data->fetch_assoc();
    echo "<tr class='canClick' onclick='highlight(id)' id='$stuff2[id]'>";
    $counter = 0;
    /* Traverse the data in every row */
    while($counter < $data->field_count){
      if($stuff[$counter] != $stuff2["id"])
      echo '<td>', $stuff[$counter], '</td>';
      $counter = $counter + 1;
    }
    echo '</tr>';
  }

   echo '</tbody></table>';
   echo '</div></body>';

  ?>

</html>
