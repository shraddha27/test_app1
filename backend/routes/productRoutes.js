const express = require('express');
const { logProductView, listProducts, getProductById } = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticate');

const router = express.Router();

router.post('/:productId/view', authenticateJWT, logProductView);
router.get("/listProducts",authenticateJWT, listProducts);
router.get("/:id",authenticateJWT, getProductById);

module.exports = router;
