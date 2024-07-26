const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
