document.addEventListener("DOMContentLoaded", function() {
    const cartList = document.getElementById('cart-list');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            `;
            cartList.appendChild(cartItem);
        });
    }

    function clearCart() {
        localStorage.removeItem('cart');
        cart = [];
        displayCartItems();
        updateCartCount();
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        generateReceipt();
    }

    function generateReceipt() {
        const receipt = cart.map(item => `<p>${item.name}: $${item.price.toFixed(2)}</p>`).join('');
        const total = cart.reduce((sum, item) =>
