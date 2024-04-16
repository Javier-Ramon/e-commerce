import productModel from "../dao/models/productModel.js";

export default class ProductManagerDB {
  async getProducts(limit, page, query, sort) {
    try {
      return await productModel.paginate(query, {limit: limit, page: page, lean: true, sort: sort})
    } catch (error) {
      console.error(error)
    }
  }

  async addProduct(productData) {
    try {
      if (!productData.title || !productData.description || !productData.price || !productData.code || !productData.stock || !productData.category) {
        console.error("Error: Todos los campos son obligatorios.");
        return;
      }
      
      const codeExist = await productModel.findOne({code: productData.code});
      if (codeExist) {
        console.error(`El  Producto  ${productData.code} ya existe.`);
        return    
      }
      return await productModel.create({
        ...productData,
        thumbnails: productData.thumbnails ?? []
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findOne({_id: id}).lean();
  
      if (!product) {
        console.error(`El Producto  ${id} no fue encontrado.`);
        return;
      }
  
      return product;
    } catch (error) {
      console.error(error)
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      if (!id || !updatedFields) {
        console.error("Error: Todos los campos son obligatorios.");
        return;
      }
    
      const product = await productModel.findOne({_id: id});
    
      if (!product) {
        console.error(`El Producto con ID ${id} no fue encontrado.`);
        return;
      }
  
      if (updatedFields.code && productModel.findOne({code: updatedFields.code})) {
        console.error(`El Producto con código ${updatedFields.code} ya existe.`);
        return
      }
      
      await productModel.findOneAndUpdate({_id: id}, updatedFields)
    } catch (error) {
      console.error(error)
    }
  }  

  async deleteProduct(id) {
    try {
      const product = await productModel.findOne({_id: id});
  
      if (!product) {
        console.error(`El Producto con id ${id} no fue encontrado.`);
        return;
      }
  
      await productModel.deleteOne({_id: id})
    } catch (error) {
      console.error(error)
    }
  }
}