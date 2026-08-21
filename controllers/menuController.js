const Menu = require("../models/Menu");

// Get all menu items for a restaurant
const getRestaurantMenu = async (request, response) => {

    const menu = await Menu.find({
        restaurantId: request.params.id
    });

    response.send(menu);
};


// Add a new menu item
const createMenu = async (request, response) => {

    const menu = new Menu(request.body);

    await menu.save();

    response.status(201).send(menu);
};


// Update a menu item
const updateMenu = async (request, response) => {

    const menu = await Menu.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    );

    if (!menu) {
        return response.status(404).send("Menu item not found");
    }

    response.send(menu);
};


// Delete a menu item
const deleteMenu = async (request, response) => {

    const menu = await Menu.findByIdAndDelete(
        request.params.id
    );

    if (!menu) {
        return response.status(404).send("Menu item not found");
    }

    response.send(menu);
};


module.exports = {
    getRestaurantMenu,
    createMenu,
    updateMenu,
    deleteMenu
};