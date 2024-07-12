import { readFile, write, writeFile} from "node:fs";

export default class CartManager {

  ultimoId = 0;
  constructor ( path = './carrito.json') {
    this.path = path;
  }

  async readCarts() {
    
    try{
      const data = await readFile(this.path, "utf-8");
        return JSON.parse(data);
    }catch(error){
      if(error.code === 'ENOENT') {
        return [];
      }else{
        throw error;
      };
    };
  };

  async saveCart(cart) {

    try {
      let carts = await this.readCarts();
      carts.push(cart);
      await writeFile(this.path, JSON.stringify(carts, null, 2))
    }catch(error){
      console.error(error);
    }
  }
}