const Cart = require('../models/cartModel');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart item not found' });
        res.json({ message: 'Cart item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkout = async (req, res) => {
    try {
        // Handle checkout logic here
        res.json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
