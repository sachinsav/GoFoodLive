const mongoose = require("mongoose");

require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

async function db(){
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to database successfully");
        const food_items_collection = mongoose.connection.db.collection("food_items")
        const fetched_data = await food_items_collection.find({}).toArray();
        // fetched_data.forEach(val => console.log(val))

        const food_cat = mongoose.connection.db.collection("foodCategory");
        const food_cat_coll = await food_cat.find({}).toArray();

        global.food_items = fetched_data;
        global.food_cat = food_cat_coll;

      } catch (er) {
        console.log(er);
      }
}

module.exports = db()
