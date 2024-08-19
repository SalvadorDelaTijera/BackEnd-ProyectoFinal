import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.UUID,
    ref: 'Product',
    required: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const CartSchema = new Schema({
  items: {
    type: [CartItemSchema],
    required: false,
    default: [],
  },
}, {
  timestamps: true,
});

CartSchema.plugin(paginate);

const Cart = model('Cart', CartSchema);

export default Cart;
