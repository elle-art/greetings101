const express = require('express');
const router = express.Router();
const usersController =  require('../controllers/usersController');

// Display all users
router.get('/', usersController.getAllUsers);

// Display one user by ID
router.get('/:id', usersController.getUserById);

// Login
router.post('/login', usersController.login);

// Signup
router.post('/signup', usersController.signup);

// Update
router.put('/:id', usersController.updateUserInfo);

// Delete user by email
router.delete('/:email', usersController.deleteUser);

module.exports = router;