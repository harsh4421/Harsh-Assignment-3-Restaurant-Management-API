require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();
app.use(express.json());
app.use(restaurantRoutes);
app.use(menuRoutes);

app.use(errorHandler);



app.listen(process.env.PORT || 5001, () => {
    console.log(`Server running on port ${process.env.PORT || 5001}`);
});

