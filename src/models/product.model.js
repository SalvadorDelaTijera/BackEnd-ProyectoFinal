import { parse } from "path";

export default class Product {

  constructor(
    title, 
    description, 
    code, 
    price,
    status = true,
    stock,
    category,
    thumbnails = []
  )
  {
    this.title = title;
    this.description = description;
    this.code = code;
    this,price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;

  }

  static parse(object) {

    if(!object.title || object.title.length === 0) {
      throw new Error("Debes proporcionar un \'title' valido." );
    }
  
    if(!object.title || object.description.length === 0){
      throw new Error("Debes proporcionar un \'description' valido." );
    }
  
    if(!object.code || object.code.length === 0){
      throw new Error("Debes proporcionar un \'code' valido." );
    }
  
    if(!object.price || object.price.length === 0){
      throw new Error("Debes proporcionar un \'price' valido." ); 
    }
  
    if(!object.status || object.status.length === 0){
      throw new Error("Debes proporcionar un \'status' valido." ); 
    }
  
    if(!object.stock || object.stock.length === 0){
      throw new Error("Debes proporcionar un \'stock' valido." );
    }
  
    if(!object.category || object.category.length === 0){
      throw new Error("Debes proporcionar un \'category' valido." );
    }
  };
};

