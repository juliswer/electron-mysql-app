const productForm = document.getElementById('productForm');

import { remote } from 'electron';
const main = remote.require('./main');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products')

let products = []
let editinStatus = false;
let productId = '';

productForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        descripion: productDescription.value        
    }

    if(!editinStatus) {
        const result = await main.createProduct(newProduct);
        console.log(result)
    } else {
       await main.updateProduct(productId, newProduct)

       editinStatus = false;
        productId = '';
    }

    productForm.reset();
    productName.focus();    
    getProducts();
})

async function deleteProduct(id) {
    const response = confirm('Are you sure you mant to delete it');
    if(response) {
        await main.deleteProduct(id)
        await getProducts()
    } else {
        return
    }
}

async function editProduct(id) {
    const product = await main.getProductById(id);
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;

    editinStatus = true;
    productId = product.id;
}

function renderProducts(products){
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
            <div class="card card-body my-2">
                <h4>${product.name}</h4>
                <p>${product.descripion}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">
                        DELETE
                    </button>
                    <button class="btn btn-secondary" onclick="editProduct('${product.id})">
                        EDIT
                    </button>
                </p>
            </div>
        `;
    })
}

const getProducts = async ( ) => {
    products = await main.getProducts()
    renderProducts(products)
}

function init() {
    await getProducts()
}
init()