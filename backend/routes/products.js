
// Step 5: Create routes (routes/products.js)

const express = require('express');
const router = express.Router();

// Import the Product model and authenticate middleware
const Product = require('../models/product');
const authenticate = require('../middleware/authenticate');

// Route 1: Add a product
router.post("/add",authenticate, async (req, res) => {
  try {
    const { productID, name, price, featured, rating, company } = req.body;

    const product = new Product({
      productID,
      name,
      price,
      featured,
      rating,
      company,
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

  

  // Route 2: Get all products
router.get('/all',  async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });



  // Route 3: Update a product
router.put('/update/:productId',authenticate,  async (req, res) => {
    try {
      const { productId } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });

  


  // Route 4: Delete a product
router.delete('/delete/:productId', authenticate, async (req, res) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });

  // Route 5: Fetch featured products
router.get('/featured',authenticate,  async (req, res) => {
    try {
      const featuredProducts = await Product.find({ featured: true });
      res.status(200).json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
// Route 6: Fetch products with price less than a certain value
router.get('/price/:maxPrice', authenticate, async (req, res) => {
    try {
      const { maxPrice } = req.params;
      const products = await Product.find({ price: { $lt: maxPrice } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });

  // Route 7: Fetch products with rating higher than a certain value
router.get('/rating/:minRating', authenticate, async (req, res) => {
    try {
      const { minRating } = req.params;
      const products = await Product.find({ rating: { $gt: minRating } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
  
  
  

module.exports = router;