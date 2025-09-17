const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement depuis le fichier .env


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

connectDB(); // Connexion MongoDB
app.use(express.json()); // Pour lire le JSON dans les requêtes

// Routes
const authRoutes = require('./routes/auth');

// Utilisation des routes
app.get('/', (req, res) => {
  res.send('server runing success...');
});

app.use('/api/auth', authRoutes);




app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
