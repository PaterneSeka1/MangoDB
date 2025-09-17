const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.uri)
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur MongoDB :', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
