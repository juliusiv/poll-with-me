// Create a new poll.
function newPoll() {
  var poll = new Peer({key: apiKey});
  poll.on("open", function(id) {
    console.log("Peer/poll id: " + id);
    $("#id").text(id);
  });

  poll.on("connection", function(conn) {
    console.log("New pollee: " + conn.peer);

    conn.on("open", function() {
      console.log("Connection opened.");
    });
    conn.on("data", function(data) {
      console.log("Pollee " + data.pollee + " voted " + data.score);
    })
  });
  return poll;
}