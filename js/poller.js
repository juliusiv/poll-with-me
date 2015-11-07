// The Poll object stores all of the poll's state.
var Poll = {
  poller: null,
  polling: true,
  q_num: 0,
  questions: []

  // this.getAnswers = function(num) {
  //   return questions[num];
  // }
}

function Question(question, number) {
  this.question = question;
  this.number = number;
  this.answers = [];
}

// Create a new poll.
function newPoll() {
  Poll.poller = new Peer({key: apiKey});
  Poll.poller.on('open', function(id) {
    console.log('Peer/poll id: ' + id);
    bindFunctions();

    $('#current-question').text('');
    $('#question-form').show();
    $('#stop-polling').prop('disabled', false);
    $('#poller-ctrl').show();
  });

  var conn = Poll.poller.on('connection', function(conn) {
    console.log('New pollee: ' + conn.peer);

    // When a connection is opened, send the current question to the new peer.
    conn.on('open', function() {
      console.log('Connection opened.');
      if (Poll.questions.length > 0) {
        var question = Poll.questions[Poll.q_num].question;
        conn.send({q: question});
      }
    });

    // When data is received, add it to the list of answers and redraw the plot.
    conn.on('data', function(data) {
      console.log('Pollee ' + data.pollee + ' voted ' + data.score);
      if(Poll.polling) {
        Poll.questions[Poll.q_num].answers.push(data.score);
        var answers = Poll.questions[Poll.q_num].answers;
        var ans = Object.keys(answers).map(function(id) {
          return answers[id];
        });
        drawAnswers(ans, Poll.questions[Poll.q_num].question);
      }
    });
  });

  $('#new-poll').hide();
}

// Bind some stuff to different buttons that exist on the poller.
function bindFunctions() {
  $('#new-question').click(function() {
    newQuestion();
  });

  $('#stop-polling').click(function() {
    Poll.polling = false;
    $('#stop-polling').prop('disabled', 'true');
    console.log('Polling stopped.');
  });

  $('#end-poll').click(function() {
    endPoll();
  });

  $('#question-submit').click(function(e) {
    e.preventDefault();
    $('#question-form').hide();
    
    Poll.polling = true;
    $('#new-question').show();
    $('#stop-polling').show();
    $('#end-poll').show();

    question = $('#question-text').val();
    Poll.questions.push(new Question(question, Poll.q_num));
    $('#current-question').text(question);
    $('#question-text').val('');

    // Send the question to all of the pollees.
    Object.keys(Poll.poller.connections).map(function(conn) {
      conn.send({q: question});
    });
  });
}

// Handle a new question.
function newQuestion() {
  $('#current-question').text(question);
  $('#question-form').hide();
  $('#stop-polling').prop('disabled', false);
  Poll.q_num += 1;
}