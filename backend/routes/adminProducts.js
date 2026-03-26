import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create Product (POST /admin/products)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get All Products (GET /admin/products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Update Product (PUT /admin/products/:id)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete Product (DELETE /admin/products/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
