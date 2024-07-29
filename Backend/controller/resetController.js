const router = require("express").Router();
const { User } = require("../model/user");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

async function resetEmail(req, res) {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "Utilisateur avec l'email donné n'existe pas !" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}auth/password-reset/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Réinitialisation du mot de passe", url);

		res
			.status(200)
			.send({ message: "Lien de réinitialisation du mot de passe envoyé à votre adresse email" });
	} catch (error) {
		res.status(500).send({ message: "Erreur interne du serveur" });
	}
};
async function verif(req, res) {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Lien invalide" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Lien invalide" });

		res.status(200).send("URL valide");
	} catch (error) {
		res.status(500).send({ message: "Erreur interne du serveur" });
	}
};

async function newPass(req, res) {
	try {
		// Valider le corps de la requête
		const passwordSchema = Joi.object({
			mdpass: passwordComplexity().required().label("Mot de passe"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		// Valider les paramètres de la requête
		if (!req.params.id || !req.params.token) {
			return res.status(400).send({ message: "Paramètres de lien invalides" });
		}

		// Trouver l'utilisateur par ID
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(400).send({ message: "Lien invalide : utilisateur non trouvé" });
		}

		// Trouver le jeton
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
			return res.status(400).send({ message: "Lien invalide : token non trouvé" });
		}

		// Vérifier l'utilisateur s'il n'est pas déjà vérifié
		if (!user.verified) user.verified = true;

		// Hasher le nouveau mot de passe
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.mdpass, salt);

		// Mettre à jour le mot de passe de l'utilisateur
		user.mdpass = hashPassword;
		await user.save();

		res.status(200).send({ message: "Mot de passe réinitialisé avec succès" });
	} catch (error) {
		console.error("Erreur interne du serveur:", error);
		res.status(500).send({ message: "Erreur interne du serveur" });
	}
}

module.exports = {
    resetEmail,
    verif,
    newPass,
}