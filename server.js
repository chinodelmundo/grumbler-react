process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Grumble = require('./models/grumble');
var config = require('./config');

var moment = require('moment');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

/**
 * GET /api/grumbles
 * Returns the 10 newest grumbles.
 */
app.get('/api/grumbles', function(req, res, next) {
  Grumble
    .find()
    .sort('-date.num')
    .limit(10)
    .exec(function(err, grumbles) {
      if (err) return next(err);

      grumbles = formatResult(grumbles);
      res.send(grumbles);
    });
});

/**
 * POST /api/grumbles/more
 * Returns the more grumbles.
 */
app.post('/api/grumbles/more', function(req, res, next) {
  var count = parseInt(req.body.count);

  Grumble
    .find()
    .sort('-date.num')
    .limit(count)
    .exec(function(err, grumbles) {
      if (err) return next(err);

      grumbles = formatResult(grumbles);
      res.send(grumbles);
    });
});

/**
 * POST /api/grumble
 * Adds new grumble to the database.
 */
app.post('/api/grumble', function(req, res, next) {
  var username = req.body.username;
  var text = req.body.text;
  var annoyanceLevel = req.body.annoyanceLevel;
    
  switch (annoyanceLevel) {
      case '1':
          annoyanceLevel = {num: 1, text: 'Mildly Annoyed'};
          break; 
      case '2':
          annoyanceLevel = {num: 2, text: 'Infuriated'};
          break; 
      case '3':
          annoyanceLevel = {num: 3, text: 'Extremely Angry'};
          break; 
      default: 
          annoyanceLevel = {num: 0, text: 'Neutral'};
  }

  try {
    var grumble = new Grumble({
      username: username,
      text: text,
      annoyanceLevel: annoyanceLevel,
      date: {
        num: Date.now(), 
        text: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    });

    grumble.save(function(err) {
      if (err) return next(err);
      res.send({ message: 'grumble has been added successfully!' });
    });
  } catch (e) {
    res.status(404).send({ message: 'Error in submitting grumble.' });
  }
});

/**
 * PUT /api/grumble/comment
 * Update grumble with new comment.
 */
app.put('/api/grumble/comment', function(req, res, next) {
  var grumbleId = req.body.grumbleId;
  var username = req.body.username;
  var text = req.body.text;

  try {
    Grumble.findOne({ _id: grumbleId }, function(err, grumble) {
      grumble.comments.push({
        username: username,
        text: text,
        date: {
          num: Date.now(), 
          text: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
      });

      grumble.save(function(err) {
        if (err) return next(err);
        res.send({ message: 'grumble has been added successfully!' });
      });
    });
  } catch (e) {
    res.status(404).send({ message: 'Error in submitting grumble.' });
  }
});

app.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash : true  
}));

app.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash : true  
}));

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;
var messages = [];

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  io.sockets.emit('startMessages', messages);

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });

  socket.on('chatMessage', function(message) {
    io.sockets.emit('chatMessage', message);

    if(messages.length >= 5) messages.shift();
    messages.push(message);
  });

  socket.on('newGrumble', function(username) {
    io.sockets.emit('newGrumble', username);
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var formatResult = function(result){
  result = result.map(function(grumble){
    grumble.date.relative = moment(grumble.date.text, 'MMMM Do YYYY, h:mm:ss a').fromNow();
    
    if(grumble.comments){
      grumble.comments = grumble.comments.map(function(comment){
        comment.date.relative = moment(comment.date.text, 'MMMM Do YYYY, h:mm:ss a').fromNow()
        return comment;
      });
    }

    return grumble;
  });

  return result;
};