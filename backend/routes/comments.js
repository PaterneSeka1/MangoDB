const express = require('express');
const { addComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/:postId', authMiddleware, addComment); // Ex: POST /api/comments/POST_ID

module.exports = router;
