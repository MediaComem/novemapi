var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/transmedia', { useNewUrlParser: true });

var index = require('./routes/index');

var joueurs = require('./routes/joueurs');
var staffs = require('./routes/staffs');
var scores = require('./routes/scores');
var evenements = require('./routes/evenements');
var etapes = require('./routes/etapes');
var datas = require('./routes/datas');
var start = require('./routes/start');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/joueurs', joueurs);
app.use('/staffs', staffs);
app.use('/scores', scores);
app.use('/evenements', evenements);
app.use('/etapes', etapes);
app.use('/datas', datas);
app.use('/start', start);

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
