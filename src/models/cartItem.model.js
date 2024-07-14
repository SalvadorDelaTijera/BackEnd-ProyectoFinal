export default class CartItem {

  #productId;
  #price;
  #stock;


  constructor(productId,price,stock,) {
    this.#productId = productId;
    this.#price = price;
    this.#stock = stock;
  }

  get productId() {
    return this.#productId;
  }

  get subtotal() {
    return this.#price * this.#stock;
  }

  get price() {
    return this.#price;
  }

  set price(newPrice) {
    if (isNaN(newPrice) || newPrice < 0) {
      throw new Error("Debes proporcionar un precio válido.");
    }
    this.#price = newPrice;
  }

  get stock() {
    return this.#stock;
  }

  set stock(newStock) {
    if (isNaN(newStock) || newStock < 1) {
      throw new Error("Debe proporcionar una cantidad válida.")
    }
    this.#stock = newStock;
  }

  static parse(object) {
    if(!object.productId || isNaN(object.productId) || object.productId < 1) {
      throw new Error("Debe proporcionar un \'productId\' válido.");
    }
    if(!object.price || isNaN(object.price) || object.price <= 0) {
      throw new Error("Debe proporcionar un \'price\' válido.");
    }

    return new CartItem(
      object.productId,
      object.price,
      object?.stock || 1
    );
  };
};
