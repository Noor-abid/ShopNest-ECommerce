const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: { type: Number },
      size: { type: String },
      price: { type: Number }
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);