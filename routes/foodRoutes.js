const express = require('express');
const foodRoute = express.Router();

foodRoute.get("/fooditems", async (req, res) => {
    try{
        res.send([global.food_items, global.food_cat]);
    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message});
    }
    
})

module.exports = foodRoute