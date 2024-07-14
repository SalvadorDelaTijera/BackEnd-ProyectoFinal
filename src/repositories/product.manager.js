import { readFile, writeFile } from "node:fs/promises"; // por????
import Product from "../models/product.model.js";

export default class ProductManager {
  static #INITIAL_LAST_ID = 0;

  #lastId;
  #products = []

  // donde se va a guardar
  constructor(path = "./src/repositories/product.json") {
    this.path = path;
  }

  //------------------------------- CREAR UN PRODUCTO -----------------------------------
  async createProduct(productData) {
    try {
      let retVal;
      const newProduct = Product.parse(productData)
      
      await this.loadFile();
      const existingProduct = this.#products.find(
        (product) => product.code === newProduct.code
      );

      if(existingProduct) {
        existingProduct.stock += newProduct.stock;
        retVal = existingProduct;
      }else{
        newProduct.Id = ++this.#lastId;
        this.#products.push(newProduct);
        retVal = newProduct;
      }

      await this.saveFile();
      return retVal;

    }catch(error){
      console.error(error);
      throw error;
    }
  };

//------------------------------- LEER UN PRODUCTO -----------------------------------
async loadProduct() {
  try {
    const reader = await readFile(this.path, { encoding: "utf-8" });
    if (reader) {

      const file = JSON.parse(reader);

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

//------------------------------- LEER TODOS LOS PRODUCTOS -----------------------------------
  async readProducts() {
    try {
      await this.loadFile();

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
      await this.loadFile();

      const data = this.#products.find((product) => product.i === productId);

      if (!data) {
        throw new Error(`Bo se encontro el producto con el id ${productId}`);
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

      const writter = JSON.stringify(file, null, 2);

      await writeFile(this.path, writter, { encoding: "utf-8"});
    
    } catch (error) {
      console.error(error);
      throw error;
    }
  }    
  //------------------------------- ACTUALIZAR UN PRODUCTO  -----------------------------------
    async updateProductById(productId, data) {
      try {
        
        await this.loadFile();

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
  
        await this.saveFile();
  
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
      await this.loadFile();

      const existingProductIndex = this.#products.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex === -1) {
        throw new Error(`No se encontró el producto con el Id ${productId}.`);
      }

      const retVal = this.#products[existingProductIndex];
      this.#products = this.#products.filter(
        (product) => product.id !== productId
      );

      await this.saveFile();
      return retVal;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
