import { readFile, writeFile } from "node:fs";



export default class ProductManager {

  ultimoId = 0;

  constructor ( ruta = './product.json' ) {
    this.ruta = ruta;
  }

  async readProducts() {
    
    try{
      const data = await readFile(this.ruta, 'utf-8')
       return JSON.parse(data);
    }catch(error){
      if(error.cocde === 'ENOENT') {
        return [];
      }else{
        throw error;
      };
    };

  };

  async saveProduct(producto){

    try {
      let productos = await this.readProducts();
       productos.push(producto);
       await writeFile(this.ruta, JSON.stringify(productos, null, 2));
    }catch (error){
      console.error(error);
    }
  }
  

}