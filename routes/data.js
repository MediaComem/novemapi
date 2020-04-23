const express = require('express');
const seeder = require('mongoose-seeder');

const data = require('../sample_data/data.json');
const { authenticateAdmin } = require('./utils');

const router = express.Router();

/* Import sample data */

router.post('/', authenticateAdmin, function(req, res, next) {
	seeder.seed(data, { dropCollections: true }).then(function() {
		res.sendStatus(204);
	}).catch(function(err) {
		return next(err);
	});
});

module.exports = router;
