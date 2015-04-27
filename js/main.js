var apiKey = "ve6ha79sg9l766r";
var pollees = {};

$(document).ready(function() {
  pollID = location.hash.substring(1);
  console.log("Anchor: " + pollID);

  if (!pollID) {
    $("#new-poll").click(function() {
      poll = newPoll();
    });    
  }
  else {
    pollee = connectToPoll(pollID);
  }

});

function connectToPoll(pollID) {
  var pollee = new Peer({key: apiKey});
  pollee.on("open", function(id) {
    console.log("New pollee created with ID " + id);
  });

  pollee.connect(pollID);
  return pollee;
}

function newPoll() {
  var poll = new Peer({key: apiKey});
  poll.on("open", function(id) {
    console.log("Peer/poll id: " + id);
    $(".route").text(id);
  });

  poll.on("connection", function(conn) {
    console.log("New pollee: " + conn.peer);
  });
  return poll;
}