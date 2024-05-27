// Fichier qui va permettre de configurer le serveur Express

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Connexion à MongoDB (je ne savais pas encoder mon mot de passe du coup je ne l'ai pas remplace dans la ligne ci-dessous)
mongoose.connect(
  "mongodb+srv://lauragaguech:<password>@cluster0.hrixhjh.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Modèle de l'utilisateur
const User = mongoose.model("User", {
  email: String,
  password: String,
  date_creation: Date,
  pseudo: String,
  photo_profil: String,
});

// Route POST pour créer un utilisateur
app.post("/utilisateurs", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route DELETE pour supprimer un utilisateur par son ID
app.delete("/utilisateurs/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route PUT pour mettre à jour un utilisateur par son ID
app.put("/utilisateurs/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route GET pour obtenir les informations d'un utilisateur par son ID
app.get("/utilisateurs/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route GET pour récupérer la liste de tous les utilisateurs
app.get("/utilisateurs", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
