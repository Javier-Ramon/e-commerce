
const socket = io();


const renderCart = async () => {
  try {
    const response = await fetch("/api/carts/:cid"); 
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const cart = await response.json();


  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};


const addToCart = async (productId, quantity) => {
  try {
    const response = await fetch(`/api/carts/:cid/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  
    renderCart();
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};


const initCart = () => {

  renderCart();

  
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const quantity = 1; 
      addToCart(productId, quantity);
    });
  });


  socket.on("cart_updated", () => {
    renderCart();
  });
};


document.addEventListener("DOMContentLoaded", initCart);