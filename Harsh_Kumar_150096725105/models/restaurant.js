const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  cuisine: { type: String, required: true, trim: true },
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Restaurant', restaurantSchema);
