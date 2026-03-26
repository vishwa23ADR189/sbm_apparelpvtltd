import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get orders for a specific user
router.get("/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// Place order
router.post("/", async (req, res) => {
  try {
    const { userEmail, products } = req.body;
    if (!userEmail || !products || products.length === 0)
      return res.status(400).json({ message: "Invalid order data" });

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({ userEmail, products, totalAmount });
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

export default router;
