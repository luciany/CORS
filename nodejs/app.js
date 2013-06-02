
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ 
	secret: 'something', 
	maxAge: new Date(Date.now() + 3600000), //1 Hour
  expires: new Date(Date.now() + 3600000), //1 Hour
  store: new express.session.MemoryStore 
}));
app.use(express.methodOverride());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://pablodenadai.github.io/");
      res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/***
***/
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
  	console.log(req.session);
    res.send(401, 'You are not authorized to view this page');
  } else {
    next();
  }
}

app.get('/users', checkAuth, function (req, res) {
  res.json([
  	{
  		'name': 'Pablo'
  	},
  	{
      'name': 'De'
    },
    {
  		'name': 'Nadai'
  	}
  ]);
});

app.post('/login', function (req, res) {
  var post = req.body;
  if (post.user == '123' && post.password == '123') {
    req.session.user_id = post.user;
    res.send(200);
  } else {
    res.send(401, 'Bad user/pass');
  }
});

app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.send(200);
}); 
/***
***/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
