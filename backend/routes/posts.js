const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// 🔐 Création d'un post (protégée)
router.post('/', authMiddleware, createPost);

// 🌍 Récupération de tous les posts (publique)
router.get('/', getAllPosts);

module.exports = router;