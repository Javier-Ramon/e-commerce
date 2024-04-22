const socket = io();

socket.emit("mensaje", "Mensaje recibido desde el cliente");

getProducts();

socket.on("receiveProducts", (products) => {
  renderProducts(products);
});

function createProduct(event) {
  event.preventDefault();
  const newProduct = {
    title: $("#title").value,
    description: $("#description").value,
    code: $("#code").value,
    price: $("#price").value,
    stock: $("#stock").value,
    category: $("#category").value,
  };

  console.log(product);

  socket.emit("addProduct", product);


  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("code").value = "";
  document.getElementById("stock").value = "";
}



function deleteProduct(productId) {
  socket.emit("deleteProduct", productId);
  getProducts();
}

function getProducts() {
  socket.emit("getProducts");
}

function renderProducts(products) {
  const productsContainer = document.getElementById("products-container");
  let productCardsHTML = "";

  products.forEach((product) => {
    productCardsHTML += `
    <div class="product-card">
      <img class="product-thumbnail" src="${product.thumbnails}" alt="Product Thumbnail">
      <div class="product-details">
        <p class="product-title">${product.title}</p>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price}</p>
        <p class="product-stock">Stock: ${product.stock}</p>
        <p class="product-code">Code: ${product.code}</p>
      </div>
      <div class="product-actions">
<<<<<<< HEAD
        <button class="delete-button" onclick="deleteProduct(${product.id})">Eliminar</button>
=======
        <button class="delete-button" onclick="deleteProduct(${product. _id})">Delete</button>
>>>>>>> d769acd00a99506514743b7452720a72335fdd36
      </div>
    </div>
    `;
  });

  productsContainer.innerHTML = productCardsHTML;
}
