document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('admin-product-list');
    const addProductForm = document.getElementById('add-product-form');

    // Mock product data
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
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            `;
            productList.appendChild(productItem);
        });
    }

    function addProduct(event) {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value;

        products.push({ name, price, image });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        addProductForm.reset();
    }

    function editProduct(index) {
        const product = products[index];
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        addProductForm.onsubmit = function(event) {
            event.preventDefault();
            products[index] = {
                name: document.getElementById('product-name').value,
                price: parseFloat(document.getElementById('product-price').value),
                image: document.getElementById('product-image').value
            };
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
            addProductForm.reset();
            addProductForm.onsubmit = addProduct;
        };
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }

    addProductForm.addEventListener('submit', addProduct);
    displayProducts();
});
