const express = require('express');
const { login, register } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticate');

const router = express.Router();

router.get("/register", register);
router.post("/login", login);

module.exports = router;
