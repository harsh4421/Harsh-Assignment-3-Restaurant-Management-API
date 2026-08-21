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



const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
