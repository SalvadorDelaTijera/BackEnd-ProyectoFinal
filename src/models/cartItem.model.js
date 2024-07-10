export default class CartItem {

  constructor (productId, quantity = 1){
    this.productId = productId;
    this.quantity = quantity;
  };

  add() {
    this.quantity++; // para agregar productos
  }
  remove(){
    if (this.quantity > 0){
      this.quantity-- // para quitar o elimimar productos
    };
  };
};
