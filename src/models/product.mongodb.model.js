import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export const ProductSchema = new Schema({
  title: {
    type: String,
    index: true,
    unique: true,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    minLength: 0,
  },
  code: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  thumbnails: {
    type: [String],
    required: false,
  },
});

ProductSchema.plugin(paginate);

const Product = model('Product', ProductSchema);

export default Product;
