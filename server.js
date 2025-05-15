const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Configuration de dotenv
dotenv.config();

const app = express();

// ✅ MongoDB Atlas
const uri = "mongodb+srv://node:node@cluster0.tsfkb3f.mongodb.net/maBase?retryWrites=true&w=majority";
console.log(process.env.PORT);

// ✅ Connexion à MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error.message);
    process.exit(1); // Quitter si erreur
  }
}
connectDB();

app.use(express.json());
app.use(cors());

// ✅ Port du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
