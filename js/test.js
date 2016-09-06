$(document).ready(function() {
  /* Adds style to the table */
  $('#example').DataTable();

  Dropzone.prototype.defaultOptions.dictDefaultMessage = "Click or Drag Files";
  Dropzone.prototype.defaultOptions.addRemoveLinks = true;
  Dropzone.prototype.defaultOptions.previewTemplate = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>";

  /* Changes the number of elements show per page from 10 to 100 */
  document.getElementsByName("example_length")[0].value = "100";
  $("[name=example_length]").change();

  /* Get columns ready for drag and drop */
  setupHandlers();
});
