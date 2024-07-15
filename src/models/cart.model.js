import CartItem from "./cartItem.model.js";

export default class Cart {
id
items

  constructor(items = []){
  this.items = items;
  };

  get items() {
    return this.items;
  };

  set items(newItems) {
    try {
      this.items = [...newItems.map((item) => CartItem.parse(item))];
    
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  addItem(newItem) {

    try {
      const newCartItem = CartItem.parse(newItem);
      const existingItemIndex = this.items.findIndex((item) => item.productId === newCartItem.productId);
      
      if (existingItemIndex === -1) {
        this.items.push(newCartItem);

      } else {
        this.items[existingItemIndex].stock += newCartItem.stock;
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  removeitem(productId) {
    try {
      const existingItemIndex = this.items.findIndex((item) => item.productId === productId);

      if (existingItemIndex !== -1) {
        this.items = this.items.filter((item) => item.productId !== productId);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  updateItem(productId, newPrice = null, newStock = null) {
    try {

      if((newPrice && !isNaN(newPrice) && newPrice > 0) || (newStock && !isNaN(newStock) && newStock > 0)) {
        const existingItemIndex = this.items.find.findIndex((item) => item.productId === productId);
      
        if (existingItemIndex !== -1) {
          if(newPrice && !isNaN(newPrice) && newPrice > 0) {
            this.items[existingItemIndex].price =newPrice;
          }

          if (newStock && !isNaN(newStock) && newStock > 0 ) {
            this.items[existingItemIndex].stock = newStock;
          }
        }
      }
    }catch (error) {
      console.log(error);
      throw error;
    }
  };
  
    static parse(object) {
      if (!object.items || object.items.length === 0) {
        throw new Error("Un carrito sin items no es valido.");
      }

      try {
        return new Cart(object.items);
      }catch (error) {
        console.log(error);
        throw error;
      }
    };
};
