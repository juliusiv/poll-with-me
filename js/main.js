$(document).ready(function() {

  $("#new-poll").click(function() {
    // alert("boobs");
    $(".route").text(genRandRoute());
  });

});

function genRandRoute()
{
  var route = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 6; i++ )
      route += possible.charAt(Math.floor(Math.random() * possible.length));
  return route;
}