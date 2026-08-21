const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    cuisine: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }

});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;