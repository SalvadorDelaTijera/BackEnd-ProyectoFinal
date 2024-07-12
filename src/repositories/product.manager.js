import { readFile, writeFile } from "node:fs";



export default class ProductManager {

  ultimoId = 0;

  // donde se va a guardar 
  constructor ( path = './product.json' ) {
    this.path = path;
  }
  //
  async readProducts() {
    
    try{
      const data = await readFile(this.path, 'utf-8')
       return JSON.parse(data);
    }catch(error){
      if(error.cocde === 'ENOENT') {
        return [];
      }else{
        throw error;
      };
    };

  };

  async readProdtById(productId){

    try {
      const products = await this.readProducts();
      const data = products.filter((product)=> product.id === productId);

      if (!data) {
        throw new Error(`Producto con el id ${productId}, no encontrado`)

      }
      return data;
    } catch (error) {
      throw error;
    }
    
  }
  async saveProduct(producto){

    try {
      let productos = await this.readProducts();
       productos.push(producto);
       await writeFile(this.path, JSON.stringify(productos, null, 2));

    }catch (error){
      console.error(error);
    }
  }
  

  async updateProductById(productId){
    
    try {
      const products = await this.readProducts();
      const data = products.filter((product) => product.id === productId);

      if (!data){
        throw new Error(`Producto con el id ${productId}, no encontrado`)
      }
      return data;

    } catch (error) {
      throw error;
      
    }
  }

  async deleteProductById(productId){

    try {
      const products = await this.readProducts();
      const data =     }
  }

}