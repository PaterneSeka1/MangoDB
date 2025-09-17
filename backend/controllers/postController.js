const Post = require('../models/Post');

// Créer un nouveau post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  // Vérifier que title et content sont présents
  if (!title || !content) {
    return res.status(400).json({ error: 'Titre et contenu sont requis.' });
  }

  // Vérifier que l'utilisateur est bien authentifié
  if (!req.userId) {
    return res.status(401).json({ error: 'Utilisateur non autorisé' });
  }

  try {
    const newPost = new Post({ title, content, author: req.userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur création post', details: err.message });
  }
};

// Récupérer tous les posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération posts', details: err.message });
  }
};

module.exports = { createPost, getAllPosts };