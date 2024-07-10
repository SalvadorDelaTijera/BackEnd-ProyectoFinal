export default class Product {

  constructor(
    title, 
    desciprion, 
    code, 
    price,
    stock,
    category,
    status = true,
    thumbnails = []
  )
  {
    this.id = -1;
    this.title = title;
    this.desciprion = desciprion;
    this.code = code;
    this,price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;

  }
}