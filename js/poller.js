var current_q = '';
var q_num = 0;
var polling = false;
var poller;
var past_answers = []
// An arry of objects representing each question's votes. The objects contain an
// ID:answer pair where the ID is the peer's ID.
var answers = {};

// Create a new poll.
function newPoll() {
  poller = new Peer({key: apiKey});
  poller.on('open', function(id) {
    console.log('Peer/poll id: ' + id);
    newQuestion();
  });

  var conn = poller.on('connection', function(conn) {
    console.log('New pollee: ' + conn.peer);
    // When a connection is opened, send the current question to the new peer.
    conn.on('open', function() {
      console.log('Connection opened.');
      conn.send({q: current_q});
    });
    // When data is received, add it to the list of answers.
    conn.on('data', function(data) {
      console.log('Pollee ' + data.pollee + ' voted ' + data.score);
      if(polling) {
        answers[data.pollee] = data.score;
        var ans = Object.keys(answers).map(function(id) {
          return answers[id];
        });
        drawAnswers(ans, current_q);
      }
    });
    // When the connection is closed delete that peer's votes from the answers.
    conn.on('close', function() {
      delete answers[conn.peer.id];
    });
  });

  $('#new-poll').hide();
}


// Handle a new question.
function newQuestion() {
  q_num += 1;
  $('#current-question').text('');
  $('#question-form').show();
  $('#stop-polling').prop('disabled', false);

  // Polling starts right when the question is submitted.
  $('#question-form').submit(function(e) {
    e.preventDefault();
    $('#question-form').hide();
    
    polling = true;
    $('#new-question').show();
    $('#stop-polling').show();
    $('#end-poll').show();

    current_q = $('#question-form input[name=question]').val();
    $('#current-question').text(current_q);
    $('#question-form input[name=question]').val('');

    Object.keys(poller.connections).map(function(conn) {
      conn.send({q: current_q});
    });

    $('#new-question').click(function() {
      newQuestion();
    });
    $('#stop-polling').click(function() {
      polling = false;
      $('#stop-polling').prop('disabled', true);
      console.log('Polling stopped');
    });
    $('#end-poll').click(function() {
      endPoll();
    });
  });
}