const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for orders
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);

module.exports = router;
