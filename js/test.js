$(document).ready(function() {
  /* Adds style to the table */
  $('#example').DataTable();

  /* Changes the number of elements show per page from 10 to 100 */
  document.getElementsByName("example_length")[0].value = "100";
  $("[name=example_length]").change();

  /*Get columns ready for drag and drop */
  columns = document.getElementsByClassName("draggableColumn");
  //var poiX = new Array(columns.length -1);
  //var poiY = new Array(columns.length -1);
  var draggableColumns = new Array(columns.length);
  for(i = 0; i < columns.length; i++){
    columns[i].addEventListener('dragstart', dragStartHandler, false);
    columns[i].addEventListener('dragend', dragEndHandler, false);
    columns[i].addEventListener('dragenter', dragEnterHandler, false);
    columns[i].addEventListener('dragleave', dragLeaveHandler, false);
    columns[i].addEventListener('dragover', function(ev){dragOverHandler(ev,this)}, false);
    columns[i].addEventListener('drag', function(ev){dragHandler(ev,columns)}, false);
    columns[i].addEventListener('drop', dropHandler, false);
  }
  //TODO Move the above code into a funciton in functions
  // Allow user to drag collumn to last position
  //Add funtion headers and inline comments
});
