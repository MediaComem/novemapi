var validator = require('validator');
const mongoose = require('mongoose');
const Evenement = require('../models/evenement');
const Schema = mongoose.Schema;

const joueurSchema = new Schema({

	pseudo: {
		type: String,
		required: true,
		minlength: [ 2, 'Le pseudo est trop court' ],
		maxlength: [ 20, 'Le pseudo est trop long' ]
	},

	prenom: {
		type: String,
		required: false,
		minlength: [ 2, 'Le prenom est trop court' ],
		maxlength: [ 20, 'Le prenom est trop long' ]
	},

	nom: {
		type: String,
		required: false,
		minlength: [ 2, 'Le nom est trop court' ],
		maxlength: [ 20, 'Le nom est trop long' ]
	},

	profileImg:{
		type:[String],
		required:false
	},

	email: {
		type: String,
		required: false,
		lowercase: 'L\'adresse email ne peut pas contenir de caratère majuscule',
		minlength: [ 5, 'L\'adresse email est trop courte' ],
		maxlength: [ 60, 'L\'email est trop longue' ],
		validate: [ validator.isEmail, 'L\'adresse email n\'est pas valide' ]
	},

	newsletter: {
		type: Boolean,
		required: false,
		default: false
	},

	evenement_id: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: 'Evenement',
		validate: existingEvenement
	},

	date_creation: {
		type: Date,
		default: Date.now
	}

});

/**
 * fonction qui valide si l'évenement existe, via son id
 */
function existingEvenement(value) {
	Evenement.findOne({ '_id': value }, function (err, joueur){
		if (err) throw err;
		return (joueur);
	});
}


module.exports = mongoose.model('Joueur', joueurSchema);
