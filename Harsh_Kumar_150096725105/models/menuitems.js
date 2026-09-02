const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  _id: Number,
  restaurantId: { type: Number, required: true, index: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('MenuItem', menuItemSchema);
