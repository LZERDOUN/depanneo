const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/connexion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const createUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("babou", salt);

  const user = new User({
    email: "laura.gaguech@gmail.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("Utilisateur créé");
  mongoose.connection.close();
};

createUser();
