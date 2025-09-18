const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // pour gérer SECRET_KEY depuis .env

const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret"; 

// Inscription
const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Optionnel : créer un token directement après inscription
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser._id, firstname, lastname, email },
      token
    });

  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’enregistrement' });
  }
};

// Connexion
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de connexion' });
  }
};

// Récupérer tous les users
const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User Data not found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Récupérer un user par ID
const getAllUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(404).json({ message: "User Data not found." });
    }
    res.status(200).json(existUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update user (avec re-hash si password modifié)
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);

    if (!existUser) {
      return res.status(404).json({ message: "User Data not found." });
    }

    let updatedData = { ...req.body };

    // Si password est présent, on le hash
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    await User.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: 'User Updated successfully' });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Supprimer un user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);

    if (!existUser) {
      return res.status(404).json({ message: "User Data not found." });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getAllUserById, update, deleteUser };