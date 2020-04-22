var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Live';
const kubemq = require('kubemq-nodejs')


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

async function connect () {
  let success = false
  if (success === false) {
    try {
      let pub = await new kubemq.Publisher('kubemq-cluster-rest.kubemq.svc.cluster.localgit ', '9090', 'pub', 'testing_event_channel');
     
      let event = await new kubemq.Publisher.Event(kubemq.stringToByte('test'));
      
      await pub.send(event).then(res => {
          console.log(res);
      });
      
    
      let sub = await new kubemq.Subscriber('kubemq-cluster-rest.kubemq.svc.cluster.local', '9090', 'sub', 'testing_event_channel');
      
      await sub.subscribeToEvents(msg => {
          console.log('msg:' + String.fromCharCode.apply(null, msg.Body))
        }
          , err => {
          console.log('error:' + err)
      });
      success = true
      
    } catch (error) {
      console.log(error)
      await setTimeout(function() {
        connect ()
      }, 3000);
    }
  }
  
}


connect()

