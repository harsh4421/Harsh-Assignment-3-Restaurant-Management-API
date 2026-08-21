const Restaurant = require("../models/Restaurant");

const getRestaurants = async (request, response) => {

    const restaurants = await Restaurant.find();

    response.send(restaurants);
};


const getRestaurantById = async (request, response, next) => {

    try {

        const restaurant = await Restaurant.findById(
            request.params.id
        );

        if (!restaurant) {
            return response.status(404).send("Restaurant not found");
        }

        response.send(restaurant);

    } catch (error) {

        next(error);

    }
};


const createRestaurant = async (request, response, next) => {

    try {

        const restaurant = new Restaurant(request.body);

        await restaurant.save();

        response.status(201).send(restaurant);

    } catch (error) {

        next(error);

    }
};

const updateRestaurant = async (request, response, next) => {

    try {

        const restaurant = await Restaurant.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!restaurant) {
            return response.status(404).send("Restaurant not found");
        }

        response.send(restaurant);

    } catch (error) {

        next(error);

    }
};

const deleteRestaurant = async (request, response, next) => {

    try {

        const restaurant = await Restaurant.findByIdAndDelete(
            request.params.id
        );

        if (!restaurant) {
            return response.status(404).send("Restaurant not found");
        }

        response.send(restaurant);

    } catch (error) {

        next(error);

    }
};

module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};