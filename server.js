const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Configuration de dotenv
dotenv.config();

const app = express();

// ✅ MongoDB Atlas
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname'; // Remplacez par votre URI MongoDB

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

// ✅ Importation des routes utilisateurs
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Préfixe pour toutes les routes utilisateurs

// ✅ Port du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});