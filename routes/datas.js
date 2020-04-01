const express = require('express');
const seeder = require('mongoose-seeder');

const datas = require('../datas.json');
const { authenticateAdmin } = require('./utils');

const router = express.Router();

router.post('/', authenticateAdmin, function(req, res, next) {
	seeder.seed(datas).then(function(dbData) {
		res.sendStatus(204);
	}).catch(function(err) {
		return next(err);
	});
});

module.exports = router;
