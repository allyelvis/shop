document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('product-list');

    // Mock product data
    const products = [
        { id: 1, name: 'Product 1', price: 10.00, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20.00, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30.00, image: 'https://via.placeholder.com/150' },
    ];

    function displayProducts(products) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    }

    if (productList) {
        displayProducts(products);
    }

    updateCartCount();
    displayCartItems();
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function displayCartItems() {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(item => {
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
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    // Proceed to checkout logic, e.g., redirect to checkout page or API call
    alert('Proceeding to checkout...');
}
