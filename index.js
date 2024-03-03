const express = require('express')
const db = require('./db')
const userRoute = require('./routes/UserRoutes');
const foodRoute = require('./routes/foodRoutes');
const orderRoute = require('./routes/OrderRoutes');
const cors = require('cors');
const app = express()
const port = 5000

app.use(cors())
app.get("/", (req, res) => {
    res.send("hello World");
});
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", foodRoute);
app.use("/api", orderRoute);
app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`)
})