var apiKey = "ve6ha79sg9l766r";
var pollees = {};
var current_poll = {};
var poll_types = ["checkboxes", "scale"];
var polling = false;
var current_votes = {};

$(document).ready(function() {
  pollID = location.hash.substring(1);

  if (!pollID) {
    $("#new-poll").click(function() {
      poll = newPoll();
    });    
  }
  else {
    var tmp = connectToPoll(pollID);
    var pollee = tmp[0];
    var conn = tmp[1];
    $("#new-poll").remove();
  }

});

function startPoll() {
  var type = "scale";
  var low = 1;
  var high = 10;


}