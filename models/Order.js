const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = Schema({
    email: {type: String, require: true, unique: true},
    orders : {type:Array}
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order