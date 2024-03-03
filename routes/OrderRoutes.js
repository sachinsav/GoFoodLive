const express = require('express')
const orderRoute = express.Router();
const Order = require('../models/Order');

orderRoute.post('/addOrder', async (req, res)=>{
    try{
        const orders = await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { orders: { $each: req.body.orders } } },
            { new: true, upsert: true });
        res.status(200).json(orders);
    }catch(err){
        console.log(err);
        res.status(401).json({error:err.message});
    }

})
orderRoute.post('/getOrder', async(req, res)=>{
    const orders = await Order.findOne({email:req.body.email});
    res.status(200).json(orders);
})

module.exports = orderRoute