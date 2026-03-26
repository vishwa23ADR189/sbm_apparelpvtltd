import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

// Get cart by user email
router.get("/:userEmail", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    res.json(cart || { products: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add product to cart
router.post("/", async (req, res) => {
  try {
    const { userEmail, product } = req.body;
    if (!userEmail || !product) {
      return res.status(400).json({ error: "Missing userEmail or product" });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, products: [product] });
    } else {
      const index = cart.products.findIndex(p => p.productId === product.productId);
      if (index >= 0) {
        cart.products[index].quantity += product.quantity;
      } else {
        cart.products.push(product);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Remove product from cart
router.delete("/:userEmail/:productId", async (req, res) => {
  try {
    const { userEmail, productId } = req.params;
    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove product" });
  }
});

export default router;
