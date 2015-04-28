// Creates a pollee that connects to an existing poll.
function connectToPoll(pollID) {
  var pollee = new Peer({key: apiKey});
  pollee.on("open", function(id) {
    console.log("New pollee created with ID " + id);
    // $('#current-question').show();
  });
  pollee.on("error", function(err) {
    $('#error').text(err);
  });

  var conn = pollee.connect(pollID);
  conn.on('open', function() {
    console.log('Connection opened and ready.');
    $('#poll-form').show();

    $('#poll-form').submit(function(e) {
      e.preventDefault();
      var score = $('input[name=score]:checked').val();
      conn.send({pollee: pollee.id, score: score});
      console.log('Sending score: ' + score);
    });
  });
  conn.on('data', function(data) {
    console.log('Received data.');
    $('#current-question').text(data['q']);
    for(var k in data) {
      console.log('  ' + k + ": " + data[k]);
    }
  });

  return [pollee, conn];
}