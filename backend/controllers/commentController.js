const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const newComment = new Comment({
      text,
      post: postId,
      author: req.userId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Erreur ajout commentaire', err });
  }
};

module.exports = { addComment };
