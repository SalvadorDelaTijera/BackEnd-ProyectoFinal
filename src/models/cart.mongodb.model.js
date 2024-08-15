import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

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
  salesPrice: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  virtuals: {
    subtotal: {
      get() {
        return this.quantity * this.salesPrice;
      }
    }
  },
  toJSON: { virtuals: true },
});

export const CartSchema = new Schema({
  items: {
    type: [CartItemSchema],
    required: false,
    default: [],
  },
}, {
  timestamps: true,
  virtuals: {
    total: {
      get() {
        return this.items.reduce((sum, item) => sum += item.price * item.salesPrice, 0);
      }
    }
  },
  toJSON: { virtuals: true },
});

CartSchema.plugin(paginate);

CartSchema.plugin(MongooseDelete, {
  indexFields: ['deleted', 'deletedAt'],
});

const CartModel = model('Cart', CartSchema);

export default CartModel;
