var express = require('express');
var router = express.Router();
const Etape = require('../models/etape');
const { authenticateAdmin } = require('./utils');

/* GET etapes listing. */
router.get('/', function(req, res, next) {
Etape.find().sort('_id').exec(function(err, etapes) {
	if (err) {
		return next(err);
	}
	res.send(etapes);
	});
});

/* GET etape by id */
router.get('/:id', loadEtape, function(req, res, next) {
	res.send(req.etape);
});

/* GET etape by niveau */
router.get('/niveau/:niveau', loadEtapeNiveau, function(req, res, next) {
	res.send(req.etape);
});

/* POST new etape */
router.post('/', authenticateAdmin, function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newEtape = new Etape(req.body);

	newEtape.date_creation = Date.now();
	// Save that document
	newEtape.save(function(err, savedEtape) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedEtape);
	});
});

/* PATCH update etape */
router.patch('/:id', authenticateAdmin, loadEtape, function(req, res, next) {

	if (req.body.question !== undefined) {
		req.etape.question = req.body.question;
	}
	if (req.body.propositions !== undefined) {
		req.etape.propositions = req.body.propositions;
	}

	req.etape.save(function(err, savedEtape) {
		if (err) {
			return next(err);
		}
		res.send(savedEtape);
	});
});

/* DELETE delete etape */
router.delete('/:id', authenticateAdmin, loadEtape, function(req, res, next) {

	req.etape.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadEtape(req, res, next) {
	Etape.findOne({"_id" : req.params.id}).exec(function(err, etape) {
		if (err) {
			return next(err);
		} else if (!etape) {
			return res.status(404).send('Aucune étape trouvée avec cet identifiant : ' + req.params.id);
		}
		req.etape = etape;
		next();
	});
}

function loadEtapeNiveau(req, res, next) {
	Etape.findOne({"niveau" : req.params.niveau}).exec(function(err, etape) {
		if (err) {
			return next(err);
		} else if (!etape) {
			return res.status(404).send('Aucune étape trouvée avec ce niveau : ' + req.params.niveau);
		}
		req.etape = etape;
		next();
	});
}

module.exports = router;
