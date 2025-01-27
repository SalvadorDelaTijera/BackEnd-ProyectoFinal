export default class Product {

  constructor(
    title, 
    description, 
    code, 
    price,
    stock,
    category,
    status = true,
    thumbnails = []
  )
  {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
  }

  static parse(object) {
    if(!object.title || object.title.length === 0) {
      throw new Error("Debes proporcionar un \'title' valido." );
    }
  
    if(!object.description || object.description.length === 0){
      throw new Error("Debes proporcionar un \'description' valido." );
    }
  
    if(!object.code || object.code.length === 0){
      throw new Error("Debes proporcionar un \'code' valido." );
    }
  
    if(!object.price || isNaN(object.price)  || object.price === 0){
      throw new Error("Debes proporcionar un \'price' valido." ); 
    }
  
    if(!object.status || object.status.length === 0){
      throw new Error("Debes proporcionar un \'status' valido." ); 
    }
  
    if(!object.stock || isNaN(object.stock) || object.stock === 0){
      throw new Error("Debes proporcionar un \'stock' valido." );
    }
  
    if(!object.category || object.category.length === 0){
      throw new Error("Debes proporcionar una \'category' valido." );
    }

    return new Product(
      object.title,
      object.description,
      object.code,
      object.price,
      object.stock,
      object.category,
      object?.status || true,
      object?.thumbnails || []
    );
  }
};

