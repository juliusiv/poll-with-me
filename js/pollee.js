// Creates a pollee that connects to an existing poll.
function connectToPoll(pollID) {
  var pollee = new Peer({key: apiKey});
  pollee.on("open", function(id) {
    console.log("New pollee created with ID " + id);
  });
  pollee.on("error", function(err) {
    $("#id").text(err);
  });

  var conn = pollee.connect(pollID);
  conn.on("open", function() {
    console.log("Connection opened and ready.");
    $("#poll-form").show();

    $("#poll-form").submit(function(e) {
      e.preventDefault();
      var score = $("input:checked").val();
      conn.send({pollee: pollee.id, score: score});
      console.log("Sending score: " + score);
    });
  });
  conn.on("data", function(data) {
    console.log("Received data ");
  });

  return [pollee, conn];
}