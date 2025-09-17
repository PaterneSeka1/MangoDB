const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ton_secret_jwt'; // à sécuriser avec .env plus tard

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
    res.status(200).json({message: 'User Created successfully'});
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’enregistrement', err });
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
    res.json({ token, user: { firstname: user.firstname, lastname: user.lastname, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de connexion', err });
  }
};

const getAllUsers = async (req,res) =>{
  try {
    const userData = await User.find();
    if(!userData || userData.length === 0){
      return res.status(404).json({message: "User Data not found."});
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

const getAllUserById = async (req,res) =>{
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if(!existUser){
      return res.status(404).json({message: "User Data not found."});
    }
    res.status(200).json(existUser);
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

const update = async (req,res) =>{
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if(!existUser){
      return res.status(404).json({message: "User Data not found."});
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, { new:true})
    res.status(200).json({message: 'User Updated successfully'});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

const deleteUser = async (req,res) =>{
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if(!existUser){
      return res.status(404).json({message: "User Data not found."});
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({message: "User delete"});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = { registerUser, loginUser, getAllUsers, getAllUserById, update, deleteUser };
