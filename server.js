var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var socket = require('socket.io');
var path = require('path');
var swig  = require('swig');
var screenshot = require('url-to-image');

var port = Number(process.env.PORT || 5000);

var app = express();
var server = http.Server(app);
var io = socket(server).listen(server);

app.engine('html', swig.renderFile);

app.use(bodyParser.json());

app.set('view engine', 'html');
app.set('views', './views');

app.set('view cache', false);
swig.setDefaults({ cache: false });

server.listen(port, function(){
  console.log('Screenie server started on *:' + port);
});

app.get('/', function(req,res){
  res.render('index', {});
});

app.post('/screenshot/', function(req,res){
  var url = req.param('url');
  var settings = {};

  if(typeof(req.param('width'))!='undefined'){
    settings.width = req.param('width');
  }
  if(typeof(req.param('height'))!='undefined'){
    settings.height = req.param('height');
  }

  if(url!=''){
    var failed = false;
    var imgurl = '/screenshots/' + getTime() + '.png';
    screenshot(url,'public' + imgurl,settings).fail(function(err){
      failed = true;
      res.send({success:false,msg:"Invalid URL"});
    }).done(function(){
      if(!failed){
        console.log('screenshotted: ' + url + ' >>> ' + imgurl);
        res.send({success:true,imgurl:imgurl});
      }
    });
  } else {
    res.send({success:false,msg:"Invalid URL"});
  }
});

app.use(express.static(path.join(__dirname, 'public')));

//

var getTime = function(){
  var d = new Date();
  var time = d.getTime();
  return time;
}

var gracefulShutdown = function() {
  console.log("Received kill signal, shutting down screenie gracefully.");
  server.close();
  console.log("Closed out remaining connections. Gracefully Shutting Down");
  process.exit();
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);  