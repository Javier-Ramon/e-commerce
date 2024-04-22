import fs from "fs";
import { cartModel } from "./models/cartModel.js";


class cartManagerDB {
  async getAllCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al obtener los carritos");
    }
  }

  async createCart() {
    try {
      const newCart = await cartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al crear el carrito");
    }
  }

  async getProductsFromCartByID(cid) {
    try {
      const cart = await cartModel
        .findById(cid)
        .populate("products.product")
        .lean();
      if (!cart) throw new Error(`Carrito con ID ${cid} no encontrado`);
      return cart;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al obtener los productos del carrito");
    }
  }

  async addProductToCart(cartid, productId, quantity = 1) {
    try {
      const cart = await cartModel.findOne({ _id: cartid });
      if (!cart) throw new Error(`Carrito con ID ${cartid} no encontrado`);

      const existingProduct = cart.products.find(
        (product) => product.product === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al agregar el producto al carrito");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      return await cartModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $set: { "products.$.quantity": quantity } }
      );
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al actualizar la cantidad del producto");
    }
  }

  async deleteCart(id) {
    try {
      return await cartModel.deleteOne({ _id: id });
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al eliminar el carrito");
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      return await cartModel.findByIdAndUpdate(cartId, { products: [] });
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al eliminar todos los productos del carrito");
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: productId } } }
      );
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al eliminar el producto del carrito");
    }
  }
}

export default cartManagerDB;