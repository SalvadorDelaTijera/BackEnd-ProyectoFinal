import { readFile, writeFile} from "node:fs/promises";
import Cart from "../models/cart.model.js"
export default class CartManager {
  static INITIAL_LAST_ID = 0;

  #lastId = 0;
  carts = [];

  constructor(path = './src/repositories/carts.json') {
    this.path = path;
  }

  async loadFile () {
    try {
      const reader = await readFile(this.path, { encoding: "utf-8" });
    
      if (reader) {
        const file = JSON.parse(reader);

        this.#lastId = file?.lastId || CartManager.INITIAL_LAST_ID;
        this.carts = file?.carts || [];

      } else {
        this.#lastId = CartManager.INITIAL_LAST_ID;
        this.carts = [];
      };

    } catch (error) {
      console.error(error);
      throw error;
    };
  };

  async saveFile() {
    try {
      const file = {
        lastId: this.#lastId,
        carts: this.carts
      };

      const writer = JSON.stringify(file, null, 2);

      await writeFile(this.path, writer, { encoding: "utf-8" });
    
    } catch (error) {
      console.log(error);
      throw error;
    };
  };

  async readAllCarts() {
    try {
      await this.loadFile();
      return this.carts;

    } catch (error) {
      console.error(error);
      throw error;
    };
  };

  async readCartById(cartId) {
    try {
      await this.loadFile();

      const existignCartIndex = this.carts.findIndex((cart) => cart.id === cartId);
    
    if(existignCartIndex === -1) {
      throw new Error(`No se encontró el carrito con el Id ${cartId}.`);
    }
    return this.carts[existignCartIndex];

    } catch (error) {
      console.error(error);
      throw error;
    };
  };

  async createCart(cartData) {
    try {
      const newCart = Cart.parse(cartData);

      await this.loadFile();

      newCart.id = ++this.#lastId;
      this.carts.push(newCart);

      await this.saveFile();
      return newCart;

    } catch (error) {
      console.error(error);
      throw error;
    };
  };

  async updateCart(cartId, cartData) {
    try {
      await this.loadFile();

      const existignCartIndex = this.carts.findIndex((cart) => cart.id === cartId);

      if (existignCartIndex === -1) {
        throw new Error(`No se encontró el carrito con el Id ${cartId}.`);
      }

      const parseCart = Cart.parse(cartData);
      this.carts[existignCartIndex] = {
        ...parseCart,
        id: cartId
      }

      await this.saveFile();
      return this.carts[existignCartIndex];

    } catch(error) {
      console.log(error);
      throw error;
    };
  };

  async deleteCart(cartId) {
    try {
      await this.loadFile();

      const existignCartIndex =this.cart.findIndex((cart) => cart.id === cartId);

      if(existignCartIndex === -1) {
        throw new Error(`No se encontró el carrito con el Id ${cartId}`);
      }

      const retVal = this.carts[existignCartIndex];
      this.cart = this.carts.filter((cart) => cart.id === cartId);

      await this.saveFile();
      return retVal;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  get lastId() {
    return this.#lastId;
  };
};
