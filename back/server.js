// Fichier qui va permettre de configurer le serveur Express

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/connexion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Route pour la connexion
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  res.status(200).json({ message: "Connexion réussie" });
});

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
});
