const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect, adminOnly } = require('../middleware/auth');

// @route  POST /api/orders
// @desc   Place a new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress
    });

    // Clear cart after order
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/orders/myorders
// @desc   Get logged in user orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/orders
// @desc   Get all orders (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  PUT /api/orders/:id
// @desc   Update order status (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;