const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes for cart
router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);
router.post('/checkout', cartController.checkout);

module.exports = router;
