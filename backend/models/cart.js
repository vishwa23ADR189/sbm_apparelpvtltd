import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String,
    }
  ],
});

export default mongoose.model("Cart", CartSchema);
