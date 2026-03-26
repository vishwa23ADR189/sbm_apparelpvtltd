import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  description: String,
  image: String,
  images: [String],
  stock: { type: Number, default: 0 },
  sizes: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    default: ['M', 'L', 'XL']
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
