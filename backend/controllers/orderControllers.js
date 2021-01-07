import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @decs    Create new order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async(req,res)=>{    
    const {orderItems,  
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, } = req.body;
    if(orderItems && orderItems.length === 0)
    {
        res.status(400);
        throw new Error('No order items');
        return;
    }
    else{
        const order = new Order({
            orderItems,  
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice, 
            user: req.user._id,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
 });

// @decs    Get order by Id
// @route   GET /api/orders/:id
// @access  private
const getOrderDetail = asyncHandler(async(req,res)=>{    
    
       const order = await Order.findById(req.params.id).populate('user','name email');
       if(order)
       {        
           res.json(order);
       }
       else{
           res.status(404);
           throw new Error('Order not found.')
       }
 });
 // @decs    Update Order to paid
// @route   POST /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async(req,res)=>{    
    
    const order = await Order.findById(req.params.id);
    if(order)
    {        
       order.isPaid = true;
       order.paidAt = Date.now();
       order.paymentResult = {
           id : req.body.id,
           status: req.body.status,
           update_time: req.body.update_time,
           emai_address: req.body.email_address,
       }
       const updateOrder = await order.save();
       res.json(updateOrder);
    }
    else{
        res.status(404);
        throw new Error('Order not found.')
    }
});

// @decs    Get orders login user
// @route   Get /api/orders/myorders
// @access  private
const getMyOrders = asyncHandler(async(req,res)=>{    
    
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
   
});

export {
    addOrderItems,   
    getOrderDetail,
    updateOrderToPaid,
    getMyOrders,
    
}