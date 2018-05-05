var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var donations = require('./routes/donations.js');
var bikes = require('./routes/bikes.js');
var users = require('./routes/users.js');
var app = express();
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//Donations
app.get('/donations', donations.findAll);
app.get('/donations/:id', donations.findOne);
app.post('/donations', donations.addDonation);
app.put('/donations/:id/votes', donations.incrementUpvotes);
app.delete('/donations/:id', donations.deleteDonation);

app.put('/donations/:id', donations.edit);

//Bikes
app.get('/bikes', bikes.findAll);
app.get('/bikes/:id', bikes.findOne);
app.post('/bikes', bikes.addBike);
app.put('/bikes/:id/users', bikes.incrementUsers);
app.delete('/bikes/:id', bikes.deleteBike);

//Users
app.post('/users', users.signUp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
