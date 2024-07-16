import { readFile, writeFile } from "node:fs/promises"; // por????
import Product from "../models/product.model.js";

export default class ProductManager {
  static #INITIAL_LAST_ID = 0;

  #lastId;
  #products = [];

  // donde se va a guardar
  constructor(path = "./src/repositories/product.json") {
    this.path = path;
  }

  //------------------------------- LEER UN PRODUCTO -----------------------------------
async loadProduct() {
  try {
    const reader = await readFile(this.path, { encoding: "utf-8" });
    if (reader) {

      const product = JSON.parse(reader);

      this.#lastId = product?.lastId || ProductManager.#INITIAL_LAST_ID;
      this.#products = product?.products || [];
    } else {
      this.#lastId = ProductManager.#INITIAL_LAST_ID;
      this.#products = [];
    }

  } catch (error) {

    if (error.code === "ENOENT") {
      this.#lastId = ProductManager.#INITIAL_LAST_ID;
      this.#products = [];
    } else {
      console.error(error);
      throw error;
    }
  };
};

  //------------------------------- CREAR UN PRODUCTO -----------------------------------
  async createProduct(productData) {
    try {
      let retVal;
      const newProduct = Product.parse(productData)
      
      await this.loadProduct();
      const existingProduct = this.#products.find(
        (product) => product.code === newProduct.code
      );

      if(existingProduct) {
        existingProduct.stock += newProduct.stock;
        retVal = existingProduct;
      }else{
        newProduct.id = ++this.#lastId;
        this.#products.push(newProduct);
        retVal = newProduct;
      }

      await this.saveProduct();
      return retVal;

    }catch(error){
      console.error(error);
      throw error;
    }
  };

//------------------------------- LEER TODOS LOS PRODUCTOS -----------------------------------
  async readProducts() {
    try {
      await this.loadProduct();

      return this.#products;

    } catch (error) {

      if ((error.code = "ENOENT")) {
        return [];
      } else {
        console.error(error);
        throw error;
      }
    };
  };

 //------------------------------- LEER UN PRODUCTO POR ID -----------------------------------
  async readProductById(productId) {
    try {
      await this.loadProduct();

      const data = this.#products.find((product) => product.id === productId);

      if (!data) {
        throw new Error(`No se encontro el producto con el id ${productId}`);
      }    
      return data;
    
    } catch( error) {
      console.error(error);
      throw error;
    } 
  }  

//------------------------------- GUARDAR UN PRODUCTO -----------------------------------
  async saveProduct() {
    try {
      const product = {
        lastId: this.#lastId,
        products: this.#products,
      };

      const writter = JSON.stringify(product, null, 2);

      await writeFile(this.path, writter, { encoding: "utf-8"});
    
    } catch (error) {
      console.error(error);
      throw error;
    }
  }    
  //------------------------------- ACTUALIZAR UN PRODUCTO  -----------------------------------
    async updateProductById(productId, data) {
      try {
        
        await this.loadProduct();

        const existingProductIndex = this.#products.findIndex(
          (product) => product.id === productId
        );  

        if (existingProductIndex === -1) {
          throw new Error(`No se encontró el producto con el Id ${productId}.`);
        }
  
        const updatedData = Product.parse(data);
        this.#products[existingProductIndex] = {
          ...updatedData,
          id: productId,
        };
  
        await this.saveProduct();
  
        return this.#products[existingProductIndex];

      }catch (error) {
        console.error(error);
        throw error;
      }
    };

    getLastId () {
      return this.this.#lastId;
    };

//------------------------------- ELIMINAR UN PRODUCTO  -----------------------------------
  async deleteProductById(productId) {
    try {
      await this.loadProduct();

      const existingProductIndex = this.#products.findIndex(
        (product) => product.Id === productId
      );

      if (existingProductIndex === -1) {
        throw new Error(`No se encontró el producto con el Id ${productId}.`);
      }

      const retVal = this.#products[existingProductIndex];
      this.#products = this.#products.filter(
        (product) => product.Id !== productId
      );

      await this.saveProduct();
      return retVal;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
