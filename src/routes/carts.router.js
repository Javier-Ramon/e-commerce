import { Router } from "express";
import cartManagerDB from "../dao/cartManager.js";

const router = Router();
const CartService = new cartManagerDB();


const cartManagerInstance = new CartManager("data/cart.json");

router.get("/:cid", async (req, res) => {
  try {
    const result = await CartService.getProductsFromCartByID(req.params.cid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const result = await CartService.createCart();
    res.send({
      status: "success",
      message: "Tu carrito ha sido creado exitosamente",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await CartService.getAllCarts();
    res.send({ carts });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  try {
    await CartService.addProductToCart(cartId, productId, quantity);
    res.send({
      status: "success",
      message: "El producto se ha agregado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({
        status: "error",
        error: "Hubo un error al agregar el producto al carrito",
      });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body.products;
  try {
    const cart = await CartService.updateCart(cartId, products);
    res.send({ status: "success", message: "Tu carrito ha sido editado", cart });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    await CartService.updateProductQuantity(cartId, productId, quantity);
    res.send({ status: "success", message: "La cantidad ha sido modificada" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({
        status: "error",
        error: "Hubo un error al actualizar la cantidad del producto",
      });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    await CartService.deleteAllProductsFromCart(cartId);
    res.send("El carrito ha sido eliminado");
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ status: "error", error: "Hubo un error al eliminar el carrito" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    await CartService.deleteProductFromCart(cartId, productId);
    res.send(`El producto ${productId} ha sido eliminado del carrito`);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({
        status: "error",
        error: "Hubo un error al eliminar el producto del carrito",
      });
  }
});

export default router;