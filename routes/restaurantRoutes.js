const express = require("express");
const router = express.Router();

const {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurantController");

router.get("/restaurants", getRestaurants);

router.get("/restaurants/:id", getRestaurantById);

router.post("/restaurants", createRestaurant);

router.put("/restaurants/:id", updateRestaurant);

router.delete("/restaurants/:id", deleteRestaurant);

module.exports = router;