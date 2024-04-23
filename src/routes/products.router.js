import { Router } from "express";
import {productManagerD} from "../dao/productManager";
import { uploader } from "../utils/multer.js";
import productModel from "../dao/models/productModel.js";

const router = Router();
const ProductService = new productManagerD();

router.get("/", async (req, res) => {
  try {
    let { limit = 10, page = 1, query = {}, sort = null } = req.query;
    const result = await ProductService.getAllProducts(
      limit,
      page,
      query,
      sort
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message, // Mensaje de error en caso de una excepción
    });
  }
});

router.post("/", uploader.array("thumbnails", 3), async (req, res) => {
  if (req.files) {
    req.body.thumbnails = [];
    req.files.forEach((file) => {
      req.body.thumbnails.push(file.filename);
    });
  }

  try {
    const result = await ProductService.createProduct(req.body);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message, // Mensaje de error en caso de una excepción
    });
  }
});

router.put("/:pid", uploader.array("thumbnails", 3), async (req, res) => {
  if (req.files) {
    req.body.thumbnails = [];
    req.files.forEach((file) => {
      req.body.thumbnails.push(file.filename);
    });
  }

  try {
    const result = await ProductService.updateProduct(req.params.pid, req.body);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message, // Mensaje de error en caso de una excepción
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message, // Mensaje de error en caso de una excepción
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;
    let query = {};
    if (title) query = { title };

    const products = await productModel.find(query).explain("executionStats");

    res.send({
      status: "success",
      payload: products,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      payload: {
        message: error.message, // Mensaje de error en caso de una excepción
      },
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const result = await ProductService.getProductByID(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message, // Mensaje de error en caso de una excepción
    });
  }
});

export default router;
