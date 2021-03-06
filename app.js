const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);

const index = require('./routes/index');

const joueurs = require('./routes/joueurs');
const staffs = require('./routes/staffs');
const scores = require('./routes/scores');
const evenements = require('./routes/evenements');
const etapes = require('./routes/etapes');
const data = require('./routes/data');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(config.basePath, express.static('public'));

const router = express.Router();
router.use('/', index);
router.use('/joueurs', joueurs);
router.use('/staffs', staffs);
router.use('/scores', scores);
router.use('/evenements', evenements);
router.use('/etapes', etapes);
router.use('/data', data);

// Plug all routes under the configured base path.
app.use(config.basePath, router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
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
