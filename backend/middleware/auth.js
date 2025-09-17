const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ton_secret_jwt'; // à sécuriser dans un fichier .env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next(); // Passe au contrôleur
  } catch (err) {
    res.status(403).json({ error: 'Token invalide', err });
  }
};






















// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'ton_secret_jwt';

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Token manquant' });

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(403).json({ error: 'Token invalide' });
//   }
// };
