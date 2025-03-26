import Order from '../models/order.model.js';

// ✅ New Order Create
export const createOrder = async (req, res) => {
    try {
        const { orderNumber, customerID, items } = req.body;
        
        // Calculate total amount
        let totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);

        const newOrder = new Order({ orderNumber, customerID, items, amount: totalAmount });
        await newOrder.save();
        
        res.status(201).json({ message: 'Order Created Successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// ✅ Fetch All Orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerID', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
