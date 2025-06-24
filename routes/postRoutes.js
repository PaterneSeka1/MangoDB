const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth'); // Middleware JWT

// ✅ Créer un post (utilisateur connecté)
router.post('/', auth, postController.createPost);

// ✅ Récupérer tous les posts avec commentaires et auteurs
router.get('/', postController.getAllPosts);

// ✅ Ajouter un commentaire à un post (utilisateur connecté)
router.post('/:postId/comments', auth, postController.addComment);

// (optionnel) Supprimer un post (uniquement par l’auteur)
router.delete('/:postId', auth, postController.deletePost);

// (optionnel) Supprimer un commentaire (par son auteur ou admin)
router.delete('/:postId/comments/:commentId', auth, postController.deleteComment);

module.exports = router;
