const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create an order
router.post('/', async (req, res) => {
    const { cartItems, totalAmount } = req.body;
    const order = new Order({ cartItems, totalAmount });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
