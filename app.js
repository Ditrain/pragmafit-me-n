const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const Equipment = require('./models/equipment');
const MovementAngle = require('./models/movement_angle');
const MuscleGroup = require('./models/muscle_group');
const logger = require('morgan');

// routes
const index = require('./routes/index');
const users = require('./routes/users');
      //Import routes for "workout" area of site
const workout = require('./routes/workout');

      app = express();

//Set up default mongoose connection
// const mongoDB = 'mongodb://127.0.0.1/me-n';
const mongoDB = 'mongodb://ditrain:dagMLAB!108610@ds131687.mlab.com:31687/me-n-v1';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// Add workout routes to middleware chain.
app.use('/workout', workout);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
