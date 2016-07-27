<!DOCTYPE html>
<html>

<?php

  $FIELDS = array("Client","Rack Space", "Megabit", "Internet Connector Fee", "Labor Charge", "Yearly Cost");
  $NUM_FIELDS = 6;
  include_once("myPHP/db.php");

echo '<head>
        <link rel="stylesheet" type="text/css" href="css/custom.css"/>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.6/jqc-1.12.3/dt-1.10.12/af-2.1.2/b-1.2.1/b-colvis-1.2.1/b-print-1.2.1/cr-1.3.2/fc-3.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.css"/>
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.6/jqc-1.12.3/dt-1.10.12/af-2.1.2/b-1.2.1/b-colvis-1.2.1/b-print-1.2.1/cr-1.3.2/fc-3.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/se-1.2.0/datatables.min.js"></script>
        <script type="text/javascript" src="js/functions.js"></script>
        <script src="js/test.js"></script>
    </head>';

echo `<body>
      <div class="container">`;

echo '<div class = "btn-toolbar">
      <button class="add btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalNorm">
       Add
     </button>
     <form id="myFormDel" action="/myPHP/deleteData.php" method="post">
     <input name="deleteId" id="deleteId" type="int" hidden="true">
     <button class="delete btn btn-danger btn-sm">Delete</button> </form>
     </div>';

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

                 foreach ($FIELDS as $val){
                   echo '<div class="form-group">';
                   echo '<label for=',$val,"input>",$val,'</label>';
                   echo '<input type="',$val,'"', ' name="', $val,'" class="form-control" id =',$val,'input placeholder=""','/>';
                   echo '</div>';

                 }
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
    $data = $mysqli->query("SELECT * FROM test2 WHERE 1");
    while($obj = $data->fetch_field()){
      if($obj->name != "id")
       echo '<th>', $obj->name, '</th>';
    }

    echo `<th style="width: 36px;"></th>`;

echo  '</tr></thead>';

/*Genearte table footer*/
echo '<tfoot><tr>';
$data = $mysqli->query("SELECT * FROM test2 WHERE 1");
while($obj = $data->fetch_field()){
  if($obj->name != "id")
   echo '<th>', $obj->name, '</th>';
}

echo  '</tr></tfoot>';


echo '<tbody>';

  while ($row =$data->fetch_assoc()) {
     echo "<tr onclick='highlight(id)' id='$row[id]'>";
     foreach ($FIELDS as $value){
       echo '<td>', $row[$value], '</td>';
     }
     echo '</tr>';
   }
   echo '</tbody></table>';
   echo '</div></body>';

  ?>

</html>
