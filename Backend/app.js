const express = require("express");


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static('images'));
dotenv.config();
const { Connect } = require("./config/connect.js");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const produitRouter = require("./routes/produit");

const cors = require("cors");



//socket 
const http = require("http");
const server = http.createServer(app);





// Connect to MongoDB
Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

// Middleware



app.use(cors());




// Middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use('/produit', produitRouter);







// Configuration du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;