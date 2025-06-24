const User = require('../models/User');
const bcrypt = require('bcrypt');

// ✅ Inscription
exports.register = async (req, res) => {
  const { firstname, lastname, phone, email, dateOfBirth, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      dateOfBirth,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    res.status(200).json({ message: 'Connexion réussie', user });
    }
    catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
    }
}
// ✅ Récupération de tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Récupération d'un utilisateur par ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
    }
    catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
    }
}

// ✅ Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, phone, email, dateOfBirth, password } = req.body;

  try {
    // Vérification de l'utilisateur
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Hachage du mot de passe si modifié
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        phone,
        email,
        dateOfBirth,
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

// ✅ Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérification de l'utilisateur
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    // Suppression de l'utilisateur
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
    catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
    }
}