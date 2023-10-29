const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  countInStock: Number,
});

module.exports = mongoose.model('Product', productSchema);
