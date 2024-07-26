document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('product-list');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    }

    function addToCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products[index];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCount.textContent = cart.length;
        }
    }

    updateCartCount();
    displayProducts();
});
document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const cartCountElement = document.getElementById('cart-count');
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    }

    function addToCart(index) {
        const product = products[index];
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        
        if (existingProductIndex >= 0) {
            // Update quantity if the product is already in the cart
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
    }

    function displayCartItems() {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="editCartItem(${index})">Edit</button>
                <button onclick="removeCartItem(${index})">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
    }

    function editCartItem(index) {
        const newQuantity = prompt('Enter the new quantity:', cart[index].quantity);
        if (newQuantity !== null) {
            cart[index].quantity = parseInt(newQuantity, 10);
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
        const receiptContent = cart.map(item => `<p>${item.name}: $${(item.price * item.quantity).toFixed(2)}</p>`).join('');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
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
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    document.getElementById('clear-cart-button').addEventListener('click', clearCart);
    document.getElementById('checkout-button').addEventListener('click', checkout);

    displayProducts();
    displayCartItems();
    updateCartCount();
});
