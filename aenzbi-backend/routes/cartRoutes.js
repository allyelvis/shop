const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Get cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add or update cart item
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ productId, quantity });
        }
        const updatedCartItem = await cartItem.save();
        res.json(updatedCartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove cart item
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
