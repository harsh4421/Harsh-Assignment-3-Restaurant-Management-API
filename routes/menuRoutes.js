const express = require("express");

const router = express.Router();

const {
    getRestaurantMenu,
    createMenu,
    updateMenu,
    deleteMenu
} = require("../controllers/menuController");


// Get menu for a restaurant
router.get("/restaurants/:id/menu", getRestaurantMenu);


// Add menu item
router.post("/menu", createMenu);


// Update menu item
router.put("/menu/:id", updateMenu);


// Delete menu item
router.delete("/menu/:id", deleteMenu);


module.exports = router;