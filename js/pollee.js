function Pollee(pollID) {
  var peer = new Peer({key: apiKey});
  var conn = this.peer.connect(pollID);
}

// Creates a pollee that connects to an existing poll.
function connectToPoll(pollID) {
  var pollee = new Peer({key: apiKey});
  pollee.on('open', function(id) {
    console.log('New pollee created with ID ' + id);
  });
  pollee.on('error', function(err) {
    $('#error').text(err);
  });

  var conn = pollee.connect(pollID);
  conn.on('open', function() {
    console.log('Connection opened and ready.');
    // $('#current-question').show();
    $('#poll-form').show();

    $('#poll-form').submit(function(e) {
      e.preventDefault();
      var score = $('input[name=score]:checked').val();
      conn.send({pollee: pollee.id, score: score});
      console.log('Sending score: ' + score);
      $("#vote-btn").prop('disabled', 'true');
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