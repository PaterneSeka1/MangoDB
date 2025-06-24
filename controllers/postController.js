const Post = require('../models/Post');

// Créer un nouveau post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const newPost = new Post({
      author: req.user.id,
      content,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du post', error: err.message });
  }
};

// Obtenir tous les posts avec les commentaires
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email') // Affiche les infos de l’auteur
      .populate('comments.author', 'username email') // Affiche les infos des commentateurs
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des posts', error: err.message });
  }
};

// Ajouter un commentaire à un post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post non trouvé' });

    const comment = {
      author: req.user.id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Commentaire ajouté', post });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du commentaire', error: err.message });
  }
};
