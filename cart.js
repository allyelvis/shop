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
        // Here you can add payment processing logic
        // For example, redirect to a payment gateway or API
        generateReceipt();
    }

    function generateReceipt() {
        // Mock receipt generation
        const receipt = cart.map(item => `<p>${item.name}: $${item.price.toFixed(2)}</p>`).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        const receiptHtml = `
            <h2>Receipt</h2>
            ${receipt}
            <p>Total: $${total}</p>
        `;
        const newWindow = window.open();
        newWindow.document.write(receiptHtml);
        newWindow.document.close();
    }

    displayCartItems();
});
