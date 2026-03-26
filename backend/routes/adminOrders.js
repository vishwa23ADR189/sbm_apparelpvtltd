const router = require("express").Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
