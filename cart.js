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
                <button onclick="editCartItem(${index})">Edit</button>
                <button onclick="removeCartItem(${index})">Remove</button>
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

    function editCartItem(index) {
        const newPrice = prompt('Enter the new price:', cart[index].price);
        if (newPrice !== null) {
            cart[index].price = parseFloat(newPrice);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }

    function removeCartItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
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
        const receiptContent = cart.map(item => `<p>${item.name}: $${item.price.toFixed(2)}</p>`).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        const receipt = `
            <h2>Receipt</h2>
            ${receiptContent}
            <h3>Total: $${total}</h3>
        `;
        printReceipt(receipt);
    }

    function printReceipt(receiptContent) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Receipt</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(receiptContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    document.getElementById('clear-cart-button').addEventListener('click', clearCart);
    document.getElementById('checkout-button').addEventListener('click', checkout);

    displayCartItems();
});
