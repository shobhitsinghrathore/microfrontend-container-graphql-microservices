const mongoose = require('mongoose');
const Product = require('./model');


const sampleProducts = [
  {
    name: 'Product 1',
    description: 'Description of Product 1',
    brand: 'Brand A',
    category: 'Category X',
    price: 10,
    countInStock: 50,
  },
];


async function insertSampleProducts() {
  try {
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`Saved product: ${product.name}`);
    }
  } catch (error) {
    console.error('Error inserting sample products:', error);
  }
}

module.exports = insertSampleProducts;
