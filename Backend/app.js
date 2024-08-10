const express = require("express");


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
app.use(express.static('images'));
dotenv.config();
const { Connect } = require("./config/connect.js");
const session = require('express-session');

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const produitRouter = require("./routes/produit");

const cors = require("cors");
const googleAuth = require("./routes/google-auth.js");
const http = require("http");
const server = http.createServer(app);
const cartRoutes = require('./routes/cart');
const adressRoutes = require('./routes/address');


// Connect to MongoDB
Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

// Middleware

app.use(logger('dev'));
app.use(cookieParser()); // Pour parser les cookies
//app.use(express.static(path.join(__dirname, 'public'))); // Pour servir les fichiers statiques depuis le dossier 'public'

// Configuration du middleware CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'http://localhost:3000', // Permet les requêtes depuis cette origine
  methods: 'GET, POST, PUT, DELETE', // Méthodes HTTP autorisées
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials', // En-têtes autorisés
  credentials: true // Autorise les cookies et les informations d'identification
}));

// Configuration de la gestion des sessions
app.use(session({
  secret: 'net 3Click secret', // Clé secrète pour signer les cookies de session
  resave: false, // Ne pas sauvegarder la session si elle n'a pas été modifiée
  saveUninitialized: true, // Sauvegarder une session non initialisée
  cookie: {
    secure: false, // Définir sur true si HTTPS est utilisé
    maxAge: 2 * 60 * 60 * 1000, // Durée de vie du cookie (2 heures)
  }
}));


// Middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use("/api/password-reset", passwordResetRoutes);
app.use('/api/produit', produitRouter);
app.use('/api/cart', cartRoutes);
app.use('/api/address', adressRoutes);

app.use("/", googleAuth);
// Middleware de journalisation
//app.use(logger("dev"));
app.use("/uploads", express.static("uploads")); // Servir les fichiers statiques

// Middleware pour initialiser Passport
//app.use(passport.initialize());
//require("./auth/google-auth.js")(passport);
// Configuration du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;