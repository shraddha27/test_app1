const express = require('express');
const { login, register } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticate');

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
