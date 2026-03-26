// Handles admin login, product CRU(D), and order listing
const express = require('express');
// ... import models
const router = express.Router();
router.post('/login', /* verify admin */);
router.get('/products', /* list */);
router.post('/products', /* add */);
router.put('/products/:id', /* update */);
router.delete('/products/:id', /* delete */);
router.get('/orders', /* list orders */);
module.exports = router;
