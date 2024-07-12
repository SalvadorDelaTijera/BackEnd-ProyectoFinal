import { readFile, writeFile } from "node:fs/promises"; // por????

export default class ProductManager {
  static lastId = 0;

  // donde se va a guardar
  constructor(path = "./product.json") {
    this.path = path;
  }

  //------------------------------- CREAR UN PRODUCTO -----------------------------------

  async createProduct(productData) {
    const newId = ProductManager.getLastId() + 1;

    const newProduct = {
      ...productData,
      id: newId,
    };
    try {
      const products = await this.readProducts();

      products.push(newProduct);
      ProductManager.setLastId(newProduct.id);
      console.log("products", products);
      await this.saveProducts(products);
    } catch (error) {
      console.error(error);
      throwerror;
    }
  }

  //------------------------------- LEER UN PRODUCTO -----------------------------------

  async readProducts() {
    try {
      const data = await readFile(this.path, "utf-8"); //{endcoding: "utf-8"}

      return JSON.parse(data);
    } catch (error) {
      if (error.cocde === "ENOENT") {
        return [];
      } else {
        throw error;
      }
    }
  }

  //------------------------------- LEER UN PRODUCTO POR ID -----------------------------------
  async readProdtById(productId) {
    try {
      const products = await this.readProducts();
      const data = products.filter((product) => product.id === productId);

      if (!data) {
        throw new Error(`No se encontro el producto con el id ${productId}, `);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  //------------------------------- GUARDAR UN PRODUCTO -----------------------------------
  async saveProduct(producto) {
    try {
      //const string  = JSON.stringify(products, null, 2)
      let productos = await this.readProducts();
      productos.push(producto);
      await writeFile(this.path, JSON.stringify(productos, null, 2));

      //  await writeFile(this.path, string, (err) => {
      //   if (err) {
      //     console.error(err);
      //   }
      // });
    } catch (error) {
      throw error;
      console.error(error);
    }
  }

  //------------------------------- ACTUALIZAR UN PRODUCTO  -----------------------------------

  async updateProductById(productId) {
    try {
      const products = await this.readProducts();
      const data = products.filter((product) => product.id === productId);

      if (!data) {
        //(productIndex === -1)
        throw new Error(`No se encontro el producto con el id ${productId},`);
      }
      return data;

      // const productId = products[productIndex].id;

      // products.splice(productIndex, 1, { ...data, id: productId });

      // await this.saveProducts(products);
    } catch (error) {
      console.error(error);
      throw error;
    }
    // static getLastId() {
    //   return ProductManager.lastId;
    // }

    // static setLastId(id) {
    //   ProductManager.lastId = id;
    // }
  }

  //------------------------------- ELIMINAR UN PRODUCTO  -----------------------------------

  async deleteProductById(productId) {
    try {
      const products = await this.readProducts();
      // const data =
      const product = products.find((item) => item.id === productId);

      if (!product) {
        throw new Error(`No se encontro el producto cin el id ${productId}`);
      }
      const modiefiedProducts = products.filter(
        (item) => item.id !== productId
      );
      await this.saveProduct(modiefiedProducts);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
