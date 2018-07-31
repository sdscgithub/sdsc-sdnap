$(document).ready(function() {
  /* Adds style to the table */
  $('#example').DataTable();
  /* Changes the number of elements show per page from 10 to 100 */
  document.getElementsByName("example_length")[0].value = "100";
  $("[name=example_length]").change();

  /* Ready the page */
  setupPage();
});
