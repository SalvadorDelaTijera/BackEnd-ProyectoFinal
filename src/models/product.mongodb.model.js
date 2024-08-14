import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

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
  thumbnails: {
    type: [String],
    required: false,
  },
});

ProductSchema.plugin(paginate);

ProductSchema.plugin(MongooseDelete, {
  indexFields: ['deleted', 'deletedAt'],
});

const Product = model('product', ProductSchema);

export default Product;
