function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(product => {
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    
    container.innerHTML = '';
    
    products.slice(0, 5).forEach(product => {
        const productData = product.fields;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const img = document.createElement('img');
        img.src = productData.image[0].url;
        img.alt = productData.name;
        
        const name = document.createElement('h3');
        name.textContent = productData.name;
        
        const price = document.createElement('p');
        price.textContent = `$${productData.price / 100}`; 
        
        productCard.appendChild(img);
        productCard.appendChild(name);
        productCard.appendChild(price);
        
        container.appendChild(productCard);
    });
}

function handleError(error) {
    console.error(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();