var apiKey = "ve6ha79sg9l766r";
var current_poll = {};
var poll_types = ["checkboxes", "scale"];
var ctx;

$(document).ready(function() {
  ctx = $("#poll-chart").get(0).getContext("2d");
  pollID = location.hash.substring(1);

  if (!pollID) {
    $("#new-poll").click(function() {
      var poll = newPoll();
    });    
  }
  else {
    var tmp = connectToPoll(pollID);
    var pollee = tmp[0];
    var conn = tmp[1];
    $("#new-poll").remove();  // Remove the New Poll button
  }

});


// Draw the answers chart.
function drawAnswers(ans, title) {
  var proper_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for(var i = 0; i < ans.length; ++i) {
    proper_data[ans[i]-1] += 1;
  }

  var data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: title,
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data: proper_data
      }]
  };
  var myNewChart = new Chart(ctx).Bar(data);
}