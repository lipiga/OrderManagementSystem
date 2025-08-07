const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: [productSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  customization: { type: String, default: '' },
  paymentMode: { 
    type: String, 
    required: true,
    enum: ['GPay', 'Cash', 'Credit Card', 'Bank Transfer']
  },
  orderStatus: { 
    type: String, 
    required: true,
    enum: ['Yet to Create', 'Yet to Pack', 'Yet to Deliver', 'Delivered']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);