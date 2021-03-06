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
var fileUpload = require('express-fileupload');

var mongoose = require('mongoose');
var Grumble = require('./models/grumble');
var User = require('./models/user');

var moment = require('moment');
var uuidV4 = require('uuid/v4');
var imgur = require('imgur');

const filePath = './public/img/';

var app = express();

mongoose.connect(process.env.MONGO_URI || require('./config').database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(fileUpload({ safeFileNames: true }));
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
  var username = req.body.username;

  if(username){
    Grumble
      .find({'username': username, 'authenticated': true})
      .sort('-date.num')
      .limit(count)
      .exec(function(err, grumbles) {
        if (err) return next(err);

        grumbles = formatResult(grumbles);
        res.send(grumbles);
      });
  }else{
    Grumble
      .find()
      .sort('-date.num')
      .limit(count)
      .exec(function(err, grumbles) {
        if (err) return next(err);

        grumbles = formatResult(grumbles);
        res.send(grumbles);
      });
  }
});

/**
 * POST /api/grumble
 * Adds new grumble to the database.
 */
app.post('/api/grumble', function(req, res, next) {
  var username = req.body.username;
  var text = req.body.text;
  var annoyanceLevel = req.body.annoyanceLevel;
  var authenticated = req.body.authenticated;
  var imgLink = req.body.imgLink;
    
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
      imgLink: imgLink,
      annoyanceLevel: annoyanceLevel,
      authenticated: authenticated,
      likes: [],
      date: {
        num: Date.now(), 
        text: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    });

    grumble.save(function(err) {
      if (err) return next(err);
      res.send();
    });
  } catch (e) {
    res.status(404).send();
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
  var authenticated = req.body.authenticated;
  var imgLink = req.body.imgLink;

  try {
    Grumble.findOne({ _id: grumbleId }, function(err, grumble) {
      grumble.comments.push({
        username: username,
        text: text,
        authenticated: authenticated,
        imgLink: imgLink,
        date: {
          num: Date.now(), 
          text: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
      });

      grumble.save(function(err) {
        if (err) return next(err);
        res.send();
      });
    });
  } catch (e) {
    res.status(404).send();
  }
});

/**
 * PUT /api/grumble/empathize
 * Update grumble likes.
 */
app.put('/api/grumble/empathize', function(req, res, next) {
  var grumbleId = req.body.grumbleId;
  var username = req.body.username;
  var empathized = req.body.empathized;

  try {
    Grumble.findOne({ _id: grumbleId }, function(err, grumble) {
      if(empathized == 'true'){
        if(grumble.likes.includes(username)){
          var index = grumble.likes.indexOf(username);
          grumble.likes.splice(index, 1);
        }
      }else{
        if(!grumble.likes.includes(username)){
          grumble.likes.push(username);
        }
      }

      grumble.save(function(err) {
        if (err) return next(err);
        res.send();
      });
    });
  } catch (e) {
    res.status(404).send();
  }
});

/**
 * GET /api/grumbles/:username
 * Returns user's grumbler
 */
app.get('/api/grumbles/:username', function(req, res, next) {
  var username = req.params.username;

  Grumble
    .find({'username': username, 'authenticated': true})
    .sort('-date.num')
    .exec(function(err, grumbles) {
      if (err) return next(err);

      grumbles = formatResult(grumbles);
      res.send(grumbles);
    });
});

/**
 * GET /api/user/:username
 * Returns user's information
 */
app.get('/api/user/:username', function(req, res, next) {
  var username = req.params.username;

  User
    .find({'username': username})
    .limit(1)
    .exec(function(err, user) {
      if (err) return next(err);
      res.send(user);
    });
});

/**
 * PUT /api/user/description
 * Updates user's description.
 */
app.put('/api/user/description', function(req, res, next) {
  var username = req.body.username;
  var description = req.body.description;

  try {
    User.findOne({ 'username': username }, function(err, user) {
      user.description = description;

      user.save(function(err) {
        if (err) return next(err);
        res.send();
      });
    });
  } catch (e) {
    res.status(404).send();
  }
});

/**
 * POST /api/user/picture
 * Updates user's profile picture.
 */
app.post('/api/user/picture', function(req, res, next) {
  let uploadFile = req.files.file;
  let filename = uuidV4() + '.jpg';
  let username = req.body.username;

  uploadFile.mv(filePath + filename , function(err) {
    if (err) return next(err);

    imgur.setClientId(process.env.IMGUR_CLIENT_ID || require('./config').IMGUR_CLIENT_ID);
    imgur.uploadFile(filePath + filename)
      .then(function (json) {
        try {
          User.findOne({'username': username}, function(err, user) {
            user.imgLink = json.data.link;

            user.save(function(err) {
              if (err) return next(err);

              Grumble
                .find({$or:[{'username': username, 'authenticated': true}, {'comments.username': username, 'comments.authenticated': true}]})
                .exec(function(err, grumbles) {
                  if (err) return next(err);

                  grumbles.forEach((grumble) => {
                    if(grumble.username == username){
                      grumble.imgLink = json.data.link;
                    }
                    
                    grumble.comments.forEach((comment) => {
                      if(comment.username == username){
                        comment.imgLink = json.data.link;
                      }
                    });

                    grumble.save(function(err) {
                      if (err) return next(err);
                    });
                  });

                  res.send();
                });
            });
          });
        } catch (e) {
          res.status(404).send();
        }
      })
      .catch(function (err) {
          console.error(err.message);
      });
  });

  
});

app.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login?status=fail',
  failureFlash : true  
}));

app.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash : true  
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/checkAuth', function(req, res, next) {
  if(req.user){
    res.send(req.user);
  }else{
    res.send(null);
  }
});

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
  io.sockets.emit('startMessages', messages);

  socket.on('chatMessage', function(message) {
    io.sockets.emit('chatMessage', message);

    if(messages.length >= 10) 
      messages.shift();

    messages.push(message);
  });

  socket.on('newGrumble', function(username) {
    io.sockets.emit('newGrumble', username);
  });
});

var ioChat  = io.of('/chat');
ioChat.on('connection', function(socket){
  onlineUsers++;

  ioChat.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    ioChat.emit('onlineUsers', { onlineUsers: onlineUsers });
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