var dayTheme = "css/day.css";
var nightTheme = "css/night.css";
var currentTheme = $('#current-theme').attr("href");

// Collapsable menu for smaller screen widths
$(document).on('click', '.navbar-collapse.in',function(e) {
    if( ($(e.target).is('button') || $(e.target).is('a'))
      && $(e.target).attr('class') != 'dropdown-toggle' )
    {
        $(this).collapse('hide');
    }
});

function setTheme(){

  // If the user is not in the database yet, don't do anything
  if(user.databaseID == -1){
    return Promise.resolve();
  }

  return getTheme(user.databaseID)
  .then(function(id){
    switch(id){
      case 0:
        return changeToDay();
        break;
      case 1:
        return changeToNight();
        break;

      default:
        return Promise.reject("Unknown theme code: " + id);
    }
  })
  .then(function(){
    currentTheme = $('#current-theme').attr("href");
  })
}

// Theme change
$("#changeThemeBtn").click(function() {
  if (currentTheme === dayTheme)
    changeToNight();
  else
    changeToDay();
  currentTheme = $('#current-theme').attr("href");
});

function changeToNight(){
  return updateTheme(user.databaseID, 1)
  .then(function(){
    $("#current-theme").attr("href", nightTheme);
    $("#logo").attr("src", "images/logo-invert.png");
  })
  .catch(function(err){
    if(err === AUTH_ERROR)
      return Promise.reject(AUTH_ERROR);
    return Promise.reject(err);
  });
}

function changeToDay(){
  updateTheme(user.databaseID, 0)
  .then(function(){
    $("#current-theme").attr("href", dayTheme);
    $("#logo").attr("src", "images/logo.png");
  })
  .catch(function(err){
    if(err === AUTH_ERROR)
      return Promise.reject(AUTH_ERROR);
    return Promise.reject(err);
  });
}
