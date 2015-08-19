//test//

var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var sass = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

var express = require('express');
var app = express();

var routes = require('./routes/index');

// view engine setup
swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', routes);


// sass middleware
app.use(sass({
  /*Options*/
  src: __dirname + '/assets',
  dest: __dirname + '/public',
  debug: true,
  //outputStyle: 'compressed',
  //prefix: '/prefix'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static('bower_components'));


/*--------- Error Handlers ----------*/
// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
