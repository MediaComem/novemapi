const express = require('express');
const seeder = require('mongoose-seeder');

const start = require('../start.json');
const { authenticateAdmin } = require('./utils');

const router = express.Router();

router.post('/', authenticateAdmin, function(req, res, next) {
	seeder.seed(start).then(function(dbData) {
		res.sendStatus(204);
	}).catch(function(err) {
		return next(err);
	});
});

module.exports = router;