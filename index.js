var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Live';

require('./sender') 
require('./reciever')


server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Health check
app.head('/health', function (req, res) {
  res.sendStatus(200);
});
