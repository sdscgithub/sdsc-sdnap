/* Variables used in functions */

//Used to time a double click in highlight and highlightCol
var date = new Date();
var lastClickTime = date.getTime();
//Used in highligh and highlightCol to tell if both clicks come from the same element
var lastId = "";
//Used in drag and drop to tell if cursor is near intersectin of dropping locations
var atIntersection = false;
//Holds information on dropzone in post and edit modals
var EditD = null;

/********** Constants **********/
// Bootstrap colors
var redTheme = "#d9534f";
var blueTheme = "#428bca";

// Highlight colors for drag and drop
var dragPrimary = blueTheme;
var dragSecondary = redTheme;

// Pixel range for drag and drop
var leftRightBuffer = 40;

// Time in miliseconds between clicks to be considered a double click
var doubleClickTime = 500;
/********** End Constants **********/


/**********
   Name: highlight
   Purpose: Highlight rows as they are clicked and unhighlight any rows that were previously clicked
   Params: id - the id of the clicked on row (should be a table row)
   Return value: none
**********/
function highlight(id){
  var date2 = new Date();
  var clickTime = date2.getTime();
  if(clickTime - lastClickTime < doubleClickTime && id == lastId){
    rowDblClick();
    lastClickTime = clickTime;
    lastId = id;
    checkHighlight();
    return;
  }
  /* Get element by id */
  var ele = $("#" + id);

  /* Check if this element has the class "highlight". If it does, this means that a
  highlighted row was clicked on. Therfore, unhighlight it and return */
  if(ele.hasClass("highlight")){
    lastClickTime = clickTime;
    lastId = id;
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    checkHighlight();
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  /* Add to highlight class and color it's background blue */
  ele.addClass("highlight");
  ele.css("background-color", blueTheme);

  /* Update the "delete" and "edit" forms elements so that they know what is higlihgted */
  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "row");
  document.getElementById("alterId").setAttribute("value",id);
  /* Make the "delete" and "edit" buttons clickable */
  checkHighlight();
  lastClickTime = clickTime;
  lastId = id;
  document.getElementById("editButton").setAttribute("data-target", "#edit");
}

/**********
   Name: highlightCol
   Purpose: Highlight columns as they are clicked and unhighlight any columns that were previously clicked
   Params: id - the id of the clicked on column ( should be a table header )
   Return value: none
**********/
function highlightCol(id){

  var date2 = new Date();
  var clickTime = date2.getTime();
  if(clickTime - lastClickTime < doubleClickTime && id == lastId){
    rowDblClick();
    lastClickTime = clickTime;
    lastId = id;
    checkHighlight();
    return;
  }

  var ele = $("#" + id);
  document.getElementById("editButton").disabled = true;
  if(ele.hasClass("highlight")){
    lastClickTime = clickTime;
    lastId = id;
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    document.getElementById("itemToDelete").setAttribute("value", "none");
    document.getElementById("editButton").setAttribute("data-target", "#edit");
    checkHighlight();
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  ele.addClass("highlight");
  ele.css("background-color", blueTheme);

  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "column");
  document.getElementById("editButton").setAttribute("data-target", "#editColumn");
  lastClickTime = clickTime;
  lastId = id;
  checkHighlight();

  var nameInDatabase = id;
  while(nameInDatabase.includes("_")){
    nameInDatabase = nameInDatabase.replace("_", " ");
  }
  document.getElementById("oldName").setAttribute("value", nameInDatabase);
}

/**********
   Name: checkHighlight
   Purpose: Make the edit and delete button clickable/disabled depending on
            whether there is a highlighted element
  Params: none
  Return value: none
**********/
function checkHighlight(){
  if(document.getElementsByClassName("highlight").length == 1){
    document.getElementById("editButton").disabled = false;
    document.getElementById("deleteButton").disabled = false;
  }else{
    document.getElementById("editButton").disabled = true;
    document.getElementById("deleteButton").disabled = true;
  }
}

/**********
   Name: checkOption
   Purpose: Update form for adding columns to include additional sections to enter in info for dropdown menus
            Also, remove these sections when the dropdown menu is deselected
  Params: id - the id of the clicked on selection box
  Return value: none
**********/
function checkOption(id){
  /* Get the element that was clicked on */
  var ele = $("#" + id);

  /* varchar(50) means that the "Dropdown" option was chosen */
  if(ele.val() == "varchar(50)"){
    /* Reveal the label and input filed */
    $("#dropdownLabel").attr("hidden", false);
    document.getElementById("dropdownText").setAttribute("type", "text");
  }else{
    /* Conceal the label and input filed */
    document.getElementById("dropdownLabel").setAttribute("hidden", "true");
    document.getElementById("dropdownText").setAttribute("type", "hidden");
  }
}

/**********
   Name: confirmColumnCreation
   Purpose: Check for underscores in new column names
   Params: none
   Return value: false if column name contains a '_', otherwise true
**********/
function confirmColumnCreation(){
  var colName = document.getElementById("New Column Name Input").value;
  var existingNames = $("th");
  var isUnique = true;
  for(var i = 0; i < existingNames.length; i++){
    if(existingNames[i].innerHTML.toLowerCase() == colName.toLowerCase()){
      isUnique = false;
    }
  }
  /* Check for illegal names */
  if(colName.includes("_")){ // must not contain an underscore
    alert("Column names cannot contain '_'");
    return false;
  }else if(! isUnique){ //name must not already exist
    alert("There is already a column with that name");
    return false;
  }else{
    return true;
  }
}

/**********
   Name: confirmDeletion
   Purpose: Alert user of what row or column is about to be deleted
   Params: none
   Return value: true if user confirms deletion, false if caneled or if there is an error
**********/
function confirmDeletion(){
  /* Do nothing if there is no item selected */
  if( document.getElementById("itemToDelete").getAttribute("value") == "none" ){
    return false;
  }

  /* The value of itemId is expected to be a number (therefore representing the id of a row *id should be unique* ) or
     a string (therefore representing the name of a column *column names should be unique*) */
  var itemId = document.getElementById("deleteId");
  var itemType = document.getElementById("itemToDelete");
  var itemName = "";

  /* Check if it is a column */
  if( isNaN(itemId.getAttribute("value")) ){

    /* Check for illegal deletions */

    /* Do not delete the last column */
    if($("th").length == 2){
      alert("You cannot delete the last column.");
      return false;
    }
    /* Do not delete the "Files" */
    if(document.getElementById( document.getElementById("deleteId").getAttribute("value") ).innerHTML == "Files"){
      alert("You cannot delete the Files column.");
      return false;
    }

    itemName = itemId.getAttribute("value");
    /* Replace all underscores with spaces */
    itemName = itemName.replace( /_/g , " ");
    /* Ask for user confirmation */
    return confirm("Are you sure that you want to remove the column titled \"" + itemName + "\"?");
  /* Must be a row if not a column*/
  }else{
    /* Children should be the all the data of the row */
    var children = document.getElementById(itemId.getAttribute("value")).childNodes;
    /* Counter to help with print format */
    var printCounter = 0;
    /* Format data of the row to print */
    for(i = 0; i < children.length; i++){
      var cellData = children[i].innerHTML;

      /* Special formatting for "Files" column. Only print innerHTML of download links */
      if(i + 1 == children.length){ //Files should always be the last index
        cellData = "";
        for(var index = 0; index < children[i].childNodes.length; index++){
          var currentChild = children[i].childNodes[index];
          if(currentChild.tagName == 'A'){
            if(index == 0){
              cellData = currentChild.innerHTML;
            }else{
              cellData = cellData + ", " + currentChild.innerHTML;
            }
          }
        }
      }


      if(cellData == ""){
        continue;
      }
      if(printCounter == 0){
        /* Print the name of the item if it is the first item */
        itemName =  itemName + cellData;
        printCounter++;
      }else{
        /* Print a comma followed by the name of the item */
        itemName =  itemName + ", " + cellData ;
      }
    }
    /* Ask for user confirmation */
    return confirm("Are you sure that you want to remove the row with data: " + itemName + "?");
  }

  /* Precautionary: this is not expected to run under any normal circumstances */
  alert("Something went wrong with the deletion");
  return false;
}

/**********
   Name: addValues
   Purpose: Fills in the edit form with the data that the row/column has
   Params: none
   Return value: none
**********/
function addValues(){
  /* There are fields on the edit column form that should only appear if the
  column has a dropdown for input. Make the hidden now; show them later
  if needed */
  if($("#newOptionsLabel") != null){
    $("#newOptionsLabel").attr("hidden", true);
  }
  if(document.getElementById("newOptions") != null){
    document.getElementById("newOptions").setAttribute("type", "hidden");
  }

  /* This means that a row was selected */
  if(document.getElementById("editButton").getAttribute("data-target") == "#edit"){

    /* Update the "Previouly Uploaded File" area */
    getUploadedFiles();
    /* Find the row that has the id that is the same as "alterId's" value */
    var id = document.getElementById("alterId").getAttribute("value");
    /* Find the children */
    var children = document.getElementById(id).childNodes;
    /* Change the "value" of the input filds to the innerHTML of the respective children */
    for(var i = 0; i < document.getElementsByClassName("inputField").length; i++){
      /* Variable for current child */
      var child = document.getElementsByClassName("inputField")[i];
      /* Change file inputs differently than other inputs */
      if(child.className.includes("editFileButton")){
        if(children[i].innerHTML != ""){
          child.innerHTML = children[i].innerHTML;
        }else{
          child.innerHTML = "No file selected";
        }
      }else{
        child.value = children[i].innerHTML;
      }
    }
  /* This means that a column was selected */
  }else{
    /* The element with id "oldName" is set to have the name of the column that was
    selected. This happens in highlight/highlightCol */
    var oldName = document.getElementById("oldName").getAttribute("value");
    /* Set the input for the columns name. Users may edit this input to change the column name */
    document.getElementById("newName").setAttribute("value", oldName);

    /* Find the select element that has all the options for this column (if it exists) */
    var selectOptions = document.getElementById(oldName + " Select");
    if(selectOptions != null){
      /* Fill this string with the select options for this column (seperated by commas) */
      var optionsString = "";
      var options = selectOptions.childNodes;
      /* Get each of the options (they are the children of the select element) */
      for(i = 0; i < options.length;i++){
        /* Format the string */
        if(i == 0){
          optionsString = optionsString + options[i].innerHTML;
          continue;
        }
        optionsString = optionsString + "," + options[i].innerHTML;
      }
      /* The input field for the column's select options */
      var optionsInput = document.getElementById("newOptions");
      /* Make it visible */
      optionsInput.setAttribute("type", "text");
      /* Set the inputs text value */
      $("#newOptions").val( optionsString);
      /* Make it visible */
      $("#newOptionsLabel").attr("hidden", false);
    }
  }
}

/**********
   Name: fileChanged
   Purpose: Change name on button for file slection when file is selected
   Params: input - the html input element that has changed
           event - the change event
   Return value: none
**********/
function fileChanged(input, event){
  console.log(event);
  var button = document.getElementById(input.name + " button edit");
  var file = event.srcElement.files[0];
  if(file){
    button.innerHTML = file.name;
  }else{
    button.innerHTML = "No file selected";
  }
}

/**********
   Name: rowDblClick
   Purpose: Brings op the edit window for whichever item that is currently highlihgted
   Params: none
   Return value: none
**********/
function rowDblClick(){
 var editBttn = document.getElementById("editButton");
 editBttn.click();
 checkHighlight();
}

/**********
   Name: setupDropzones
   Purpose: Programically sets up drozones for add/edit modals and "Files" column
   Params: none
   Return value: none
**********/
function setupDropzones(){
  Dropzone.prototype.defaultOptions.dictDefaultMessage = "<i>Click or Drag Files Here</i>";
  Dropzone.prototype.defaultOptions.addRemoveLinks = false;
  Dropzone.prototype.defaultOptions.createImageThumbnails = false;
  Dropzone.prototype.defaultOptions.previewTemplate = "<div></div>";
  Dropzone.autoDiscover = false;

    /* Set up edit modal dropzone */
    editD = $("#editDropzone").dropzone({
          url: "myPHP/uploadFile.php",
          success: function (file,response) {
              var fileName = response;
              file.previewElement.classList.add("dz-success");
              if(document.getElementById("rowDataForm").getAttribute("mode") == "edit"){
                addFileToSelectedRow(fileName, document.getElementById("alterId").getAttribute("value"));
              }
              addToPreviouslyUploaded(fileName);
          },
          error: function (file, response) {
              file.previewElement.classList.add("dz-error");
          }
      });


      /* Set up "Files" column dropzones */
      $(".columnDropzone").dropzone({
            url: "myPHP/uploadFile.php",
            success: function (file,response) {
                var fileName = response;
                file.previewElement.classList.add("dz-success");
                addFileToSelectedRow(fileName, this.element.getAttribute("parentId"));
                reloadPage();
            },
            error: function (file, response) {
                file.previewElement.classList.add("dz-error");
            },
            init: function () {
                this.element.setAttribute("parentid", this.element.parentElement.getAttribute("id"));
            },
            dictDefaultMessage: ""
        });

}

/**********
   Name: addFileToSelectedRow
   Purpose: Add the newly updated file's name to "files" in the sqldatabase
   Params: fileName - the name of the file
           id - the row id where "files" should be updated
   Return value: none
**********/
function addFileToSelectedRow(fileName, id){
  $.post("myPHP/addFileToDatabase.php", {fileName: fileName, id: id}, function(fileAdded){
    if(!fileAdded){
      alert("There was an error uploading the file");
      $.post("myPHP/removeFile.php", {fileName: filename, ID : id});
    }
  });
}

/**********
   Name: updateHiddenFiles
   Purpose: fileName is a file that has been uploaded to the sever already.
            This function updates the sql table to reflect that this file has
            been uploaded
   Params: fileName - the newly uploaded file
   Return value: none
**********/
function updateHiddenFiles(fileName){

  /* The input from the add entry modal */
  var fileInput = document.getElementById("hiddenFiles");
  /* Set the column equl to the fileName if the table is empty, otherwise append a
  colon ":" and then the fileName */
  if(fileInput.getAttribute("value") == "" || fileInput.getAttribute("value") == null){
    fileInput.setAttribute("value", fileName );
  }else{
    fileInput.setAttribute("value", fileInput.getAttribute("value") + ":" + fileName);
  }
}

/********** Drag handling methods **********/
/* These methods are used to handle the dragging and dropping of
the columns. They add visual effects and POST data */

/**********
   Name: dragStartHandler
   Purpose: Identify the element being dragged and stylize it
   Params: ev - the drag start event
   Return value: none
**********/
function dragStartHandler(ev){
  this.style.opacity = "0.4";
  /* This data will be acccessed when dropped and used in POST request */
  ev.dataTransfer.setData('text/html', this.innerHTML);
  /* Used to identify element that is being dragged */
  /* (only one element is expected to be part of class "beingDragged" at any time) */
  this.classList.add("beingDragged");
}

/**********
   Name: dragEndHandler
   Purpose: Return the element back to its original, pre-drag state
   Params: ev - the drag end event
   Return value: none
**********/
function dragEndHandler(ev){
  this.style.opacity = "1.0";
  this.style.border = "";
  this.classList.remove("beingDragged");
}

/**********
   Name: dragLeaveHandler
   Purpose: Return the element back to its original, pre-drag state
   Params: ev - the drag end event
   Return value: none
**********/
function dragLeaveHandler(){
  this.style.opacity = "1.0";
  this.style.border = "";
  /* Remove any classes that may have been added to this element */
  this.classList.remove("swap");
  this.classList.remove("left");
  this.classList.remove("right");
}

/**********
   Name: dragOverHandler
   Purpose: Identify what part of the element the cursor is over
   Params: ev - the drag over event
   Return value: none
**********/
function dragOverHandler(ev){
  /* Must prevent default to allow dropping on other dragable objects */
  if(ev.preventDefault){
    ev.preventDefault();
  }

  /* Cursor is on the left edge of the element */
  if(inRangeLeft(ev, this)){
    this.style.opacity = "1.0";
    this.style.border = "";
    this.style.borderLeft = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("left");
    this.classList.remove("swap");
    this.classList.remove("right");
  /* Cursor is on the right edge of the element */
  }else if(inRangeRight(ev, this)){
    this.style.opacity = "1.0";
    this.style.border = "";
    this.style.borderRight = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("right");
    this.classList.remove("left");
    this.classList.remove("swap");
  /* Cursor is just over an element but not near it left/right edge */
  }else{
    this.style.opacity = "0.4";
    this.style.border = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("swap");
    this.classList.remove("left");
    this.classList.remove("right");
  }
}

/**********
   Name: dropHandler
   Purpose: Make the post request to move the columns around
   Params: ev - the drop event
   Return value: none
**********/
function dropHandler(ev){
    /* This object will be sent with the POST request */
    var obj = new Object();
    obj.name = ev.dataTransfer.getData('text/html');

    /* Precautionary. There should only be one element total in "left", "swap",
    or "right" */
    if( ($(".left").length + $(".swap").length + $(".right").length) > 1){
      alert ("There was a problem moving the column");
      return;
    }

    /* There should be a single element with the class "left", "right" or "swap"
    Find which class the element belongs to and update obj accordingly */
    if($(".left").length != 0){
      obj.name2 = $(".left")[0].innerHTML;
      obj.type = "left";
    }else if($(".swap").length != 0){
      obj.name2 = $(".swap")[0].innerHTML;
      obj.type = "swap";
    }else{
      obj.name2 = $(".right")[0].innerHTML;
      obj.type = "right";
    }

   /* Do not move any columns if the element was dropped on itself */
   if(obj.name2 == obj.name){
     return;
   }
  /* Make the POST request */
  $.post("myPHP/moveColumn.php", obj,function(data){
    /* Update the window once the database is updated */
    window.location = "index.php";
  });
}

/**********
   Name: dragHandler
   Purpose: Stylize the element that is being dragged
   Params: ev - the drag start event
   Return value: none
**********/
function dragHandler(ev){
  document.getElementsByClassName("beingDragged")[0].style.border = "thin dashed " + dragPrimary;
}

/**********
   Name: setupHandlers
   Purpose: Get columns ready for drag and drop
   Params: none
   Return value: none
**********/
function setupHandlers(){
  /* Get an array of all draaggable colums */
  var columns = document.getElementsByClassName("draggableColumn");
  for(i = 0; i < columns.length; i++){
    /* Add handlers */
    columns[i].addEventListener('dragstart', dragStartHandler, false);
    columns[i].addEventListener('dragend', dragEndHandler, false);
    columns[i].addEventListener('dragleave', dragLeaveHandler, false);
    columns[i].addEventListener('dragover', dragOverHandler, false);
    columns[i].addEventListener('drag', dragHandler, false);
    columns[i].addEventListener('drop', dropHandler, false);
  }
}


/********** End of drag handlers **********/


/**********
   Name: inRangeLeft
   Purpose: Checks whether the x,y coord of ev is near element's BoundingBox left wall
   Params: ev - the event which the x coordinate will be compared to
           element - the element to compare with
   Return value: true if within the range, false if not
**********/
function inRangeLeft(ev, element){
    return Math.abs(getLeftX(element) - ev.clientX) < leftRightBuffer;
}

/**********
   Name: inRangeRight
   Purpose: Checks whether the x,y coord of ev is near element's BoundingBox right wall
   Params: ev - the event which the x coordinate will be compared to
           element - the element to compare with
   Return value: true if within the range, false if not
**********/
function inRangeRight(ev, element){
  return Math.abs(getRightX(element) - ev.clientX) < leftRightBuffer;
}

/**********
   Name: getLeftX
   Purpose: Returns the x coordinate of element's bounding box's left side
   Params: element - the event which the x coordinate will be compared to
   Return value: the x coordinate of the left side of element's bounding box
**********/
function getLeftX(element){
  return element.getBoundingClientRect().left;
}

/**********
   Name: getLeftX
   Purpose: Returns the x coordinate of element's bounding box's right side
   Params: element - the event which the x coordinate will be compared to
   Return value: the x coordinate of the right side of element's bounding box
**********/
function getRightX(element){
  return element.getBoundingClientRect().right;
}

/**********
   Name: exportExcel
   Purpose: Creates and downloads an excel file of the table.
   Params: none
   Return value: none
**********/
function exportExcel() {
  var d =$('#example').tableExport({type:'excel',escape:'false',tableName:'yourTableName'
  });
  var a = document.createElement('a');
  a.href = d;
  a.download = "SDNAP " + new Date().toLocaleString() + ".xls"
  a.click();
}

/**********
   Name: getUploadedFiles
   Purpose: Get file names from the sql table and display them
   Params: none
   Return value: none
**********/
function getUploadedFiles(){
  /* id is the sql table id of the selected row */
  var id = document.getElementById("alterId").getAttribute("value");
  /* The div the will hold a list of the files that are on the server */
  var prev = document.getElementById("previouslyUploaded");
  /*Remove any files that may be in the list (it may have been populated for another row) */
  while (prev.firstChild) {
    prev.removeChild(prev.firstChild);
  }

  /* Add an empty <i> node. This node will be set to 'None' if there are no files
     on the server */
  var noneText = document.createElement("i");
  prev.appendChild(noneText);

  /* Remove the div that usually shows the uploaded file (we will instead show
     them in the div with id of "previouslyUploaded") */
  var uploads = document.getElementsByClassName("dz-preview");

  for(var i = 0; i < uploads.length; i++){
    while(uploads[i].firstChild){
      uploads[i].removeChild(uploads[i].firstChild);
    }
  }

  /* Add an unordered list to the div. Files will be put in here */
  var list = document.createElement("ul");
  list.classList.add("list-group");
  list.setAttribute("id", "previouslyUploadedUl")
  prev.appendChild(list);
  /* Retrieve colon delimited list of files to display (based on id)*/
  $.post("myPHP/getFiles.php", {id: id}, function(data){


    if(data == ""){
      noneText.innerHTML = "None";
      /* Remove the empty list */
      prev.removeChild(list);
      return;
    }

    /* Files are delimited by ":". Get the files' names in an array */
    /* Add a li and button to remove the li for each file */
    /***Note: I was having trouble with adding a button directly(couldn't get the onclick to work),
        so I added a button within a span as a workaround */
    var files = data.split(":");
    for(var i = 0; i < files.length; i++){
      var li = document.createElement("li");
      var span = document.createElement("span");

      var fileName = files[i];

      li.innerHTML = fileName;
      li.classList.add("list-group-item");
      li.setAttribute("id", fileName + " List Item" );

      /* Work around. See note above */
      span.innerHTML = "<button class='btn btn-danger btn-sm' style='float: right;' onclick='removeFile(" + "\"" + fileName  + "\""  + "," + id + ")'>Remove</button>";

      li.appendChild(span);
      list.appendChild(li);
    }
  });
}

/**********
   Name: removeFile
   Purpose: remove the file from the server and from the sql table
   Params: fileName - the file to remove
           id - the row to remove the file from
   Return value: none
**********/
function removeFile(fileName, id){
  /* Remove the file from the server, sql table and list */
  window.$.post("myPHP/removeFile.php", {name : fileName, ID : id}, function(wasDeleted){
    if(wasDeleted){
      var listItem = document.getElementById(fileName + " List Item");
      listItem.parentElement.removeChild(listItem);
      if(document.getElementById("previouslyUploadedUl").children.length == 0){
        document.getElementById("previouslyUploaded").firstChild.innerHTML = "None";
        document.getElementById("previouslyUploadedUl").parentElement.removeChild(document.getElementById("previouslyUploadedUl"));
      }
      if(document.getElementById("rowDataForm").getAttribute("mode") == "post"){
        var hiddenFilesInput = document.getElementById("hiddenFiles");
        var hiddenFilesInputValue = hiddenFilesInput.getAttribute("value");
        hiddenFilesInputValue = hiddenFilesInputValue.replace(fileName, "");
        hiddenFilesInput.setAttribute("value", hiddenFilesInputValue);
      }
    }else{
      alert("There was a problem deleteing the file.");
    }
  });

}

/**********
   Name: cancelRowCreation
   Purpose: remove files from the server since the row creation was cancelled
   Params: fileNames - the files to remove (a stirng of file names, sepereated by :)
   Return value: none
**********/
function cancelRowCreation(){
  var fileNames = document.getElementById("hiddenFiles").getAttribute("value");
  if(fileNames == null){
    return;
  }
  var files = fileNames.split(":");
  for(var i = 0; i < files.length; i++){
    var fileName = files[i];
    window.$.post("myPHP/removeFile.php", {name : fileName, ID : -1}, function(wasDeleted){
      if(!wasDeleted){
        alert("There was an error removing the file");
      }
      document.getElementById("hiddenFiles").setAttribute("value", "");
    });
  }
}

/**********
   Name: addToPreviouslyUploaded
   Purpose: add a <li> to the <ul> in the "previoulsyUploaded" div
   Params: fileName - the file to add
   Return value: none
**********/
function addToPreviouslyUploaded(fileName){
  var prev = document.getElementById("previouslyUploaded");
  var list = document.getElementById("previouslyUploadedUl");
  /* create the <ul> if it does not exist yet */
  if(!list){
    var list = document.createElement("ul");
    list.classList.add("list-group");
    list.setAttribute("id", "previouslyUploadedUl")
    prev.appendChild(list);
  }
  /* Hide the "None" text so that the new file can be shown */
  if(prev.firstChild.innerHTML == "None"){
    prev.firstChild.innerHTML = "";
  }

  /***Note: I was having trouble with adding a button directly(couldn't get the onclick to work),
      so I added a button within a span as a workaround */
  var li = document.createElement("li");
  var span = document.createElement("span");
  var id = -1;
  if(document.getElementById("rowDataForm").getAttribute("mode") == "edit"){
    id = document.getElementById("alterId").getAttribute("value");
  }

  li.innerHTML = fileName;
  li.classList.add("list-group-item");
  li.setAttribute("id", fileName + " List Item" );

  /* Work around. See note above */
  span.innerHTML = "<button class='btn btn-danger btn-sm' style='float: right;' onclick='removeFile(" + "\"" + fileName  + "\""  + "," + id + ")'>Remove</button>";

  li.appendChild(span);
  list.appendChild(li);

  if(document.getElementById("rowDataForm").getAttribute("mode") == "post"){
    updateHiddenFiles(fileName);
  }
}

/**********
   Name: reloadPage
   Purpose: reloads the page (mainly used to update "files" column)
   Params: none
   Return value: none
**********/
function reloadPage(){
  location.reload();
}

/**********
   Name: setupPage
   Purpose: calls methods that are needed to make page function normally
   Params: none
   Return value: none
**********/
function setupPage(){
  /* Get columns ready for drag and drop */
  setupHandlers();
  /* Initialize the dropzones */
  setupDropzones();

  /* Reload the page whenever a file may have been uploaded (when the edit modal is hidden)*/
  $('#edit').on('hide.bs.modal', function (e) {
    if(document.getElementById("rowDataForm").getAttribute("mode") == "post"){
      cancelRowCreation();
    }
    reloadPage();
  });
}

/**********
   Name: changeRowModal
   Purpose: sets up the modal for either posting or editing
   Params: modalType - a string that is either "edit" or "post"
   Return value: none
**********/
function changeRowModal(modalType){
  /* The form on the modal */
  var form = document.getElementById("rowDataForm");
  /* The input for files that are uploaded on the post modal */
  var hiddenFiles = document.getElementById("hiddenFiles");
  /* Expected value is either "edit" or "post" */
  switch (modalType){
    case "edit":
      /* Keep track of what mode the modal is in */
      form.setAttribute("mode", "edit");
      /* Set form action */
      form.setAttribute("action", "myPHP/updateData.php");
      /* Update title */
      document.getElementById("modalLabel").innerHTML = "Edit Entry";
      /* Remove hiddenFiles if it exists (only used in "post" mode) */
      if(hiddenFiles != null){
        hiddenFiles.parentElement.removeChild(hiddenFiles);
      }
      /* Add existing values to the input filds */
      addValues();
      break;

    case "post":
      /* Keep track of what mode the modal is in */
      form.setAttribute("mode", "post");
      /* Set form action */
      form.setAttribute("action", "myPHP/postData.php");
      /* Update title */
      document.getElementById("modalLabel").innerHTML = "Add Entry";
      /* Add hiddenFiles if it doesn't exist (only used in "post" mode) */
      if(hiddenFiles == null){
        hiddenFiles = document.createElement("input");
        hiddenFiles.setAttribute("name", "files");
        hiddenFiles.setAttribute("id", "hiddenFiles");
        hiddenFiles.setAttribute("type", "hidden");
        form.appendChild(hiddenFiles);
      }
      /* Make sure that the "previouslyUploaded" div shows the text "None" if no
         files have been uploaded */
      var prev = document.getElementById("previouslyUploaded");
      if(prev.childNodes.length == 0){
        var noneText = document.createElement("i");
        noneText.innerHTML = "None";
        prev.appendChild(noneText);
      }
      break;
  }
}
