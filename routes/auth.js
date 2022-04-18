var express = require('express');
var router = express.Router();
const userController = require('../controllers/auth');

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

module.exports = router;
