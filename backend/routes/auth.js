const express = require('express');
const { registerUser, loginUser, getAllUsers, getAllUserById, update, deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);       
router.get('/users', getAllUsers);
router.get('/user/:id', getAllUserById);
router.put('/update/user/:id', update);
router.delete('/delete/user/:id', deleteUser);

module.exports = router;