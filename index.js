const express = require('express')
const db = require('./db')
const userRoute = require('./routes/UserRoutes');
const foodRoute = require('./routes/foodRoutes');
const orderRoute = require('./routes/OrderRoutes');
const cors = require('cors');
const path = require('path');
const app = express()
const port = 5000

app.use(cors())
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", foodRoute);
app.use("/api", orderRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`)
})