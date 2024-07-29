const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

async function auth (req, res)  {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).send({ message: "E-mail ou mot de passe incorrect" });
		}

		// Vérifier si l'utilisateur est vérifié
		if (!user.verified) {
			return res.status(401).send({ message: "Veuillez vérifier votre adresse e-mail avant de vous connecter" });
		}

		const validPassword = await bcrypt.compare(req.body.mdpass, user.mdpass);
		if (!validPassword) {
			return res.status(401).send({ message: "E-mail ou mot de passe incorrect" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Connexion réussie" });
	} catch (error) {
		console.error("Erreur de connexion:", error);
		res.status(500).send({ message: "Erreur interne du serveur" });
	}
};

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("E-mail"),
		mdpass: Joi.string().required().label("Mot de passe"),
	});
	return schema.validate(data);
};

module.exports = {
    auth,
   
}