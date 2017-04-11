const http = require('http');
const Static = require('node-static');
const WebSocketServer = require('ws');

const webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {
  console.log('New connection');

  ws.on('message', function(message) {
    console.log('Client says: ' + message);
    ws.send(giveSupport(answers));
  });

  ws.on('close', function() {
    console.log('Connection closed');
  });

});

const httpServer = new Static.Server('.');
http.createServer(function (req, res) {

  httpServer.serve(req, res);

}).listen(8080);

const answers = [
  'Nope.',
  'You\'ll fail. As usual.',
  'Don\'t even try.',
  'Bad idea.',
  'Ahahahah, that\'s hilarious!'
];

function giveSupport(answers) {
  return answers[Math.floor(answers.length * Math.random())];
}

console.log("Server launched on port 8080. Websocket server launched on port 8081");

