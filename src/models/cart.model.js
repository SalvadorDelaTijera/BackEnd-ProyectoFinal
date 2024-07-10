import CartItem from "./cartItem.model.js";

export default class Cart {

  products = [];

  constructor(products){
    this.id = - 1;
   products.forEach(element => {
    this.products.push(new CartItem(element.id))
   });
  };
};
