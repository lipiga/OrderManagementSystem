const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products, ...rest } = req.body;
    
    // Calculate total
    const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);
    
    const order = new Order({
      ...rest,
      products,
      total
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, ...rest } = req.body;
    
    // Calculate total if products are updated
    const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);
    
    const order = await Order.findByIdAndUpdate(
      id,
      { ...rest, products, total },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};