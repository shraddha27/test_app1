const express = require('express');
const { getRecentlyViewed, login } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticate');

const router = express.Router();

router.get('/:userId/recentlyViewed', authenticateJWT, getRecentlyViewed);

module.exports = router;
