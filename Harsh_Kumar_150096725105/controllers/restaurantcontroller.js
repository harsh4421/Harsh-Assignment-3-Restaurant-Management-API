const Restaurant = require('../models/restaurant');
const MenuItem = require('../models/menuitems');
const Counter = require('../models/counter');

async function nextId(name) {
  const counter = await Counter.findOneAndUpdate({ _id: name }, { $inc: { value: 1 } }, { new: true, upsert: true });
  return counter.value;
}

function validateRestaurant(body) {
  const required = ['name', 'city', 'address', 'cuisine'];
  return required.filter(field => !body[field]);
}

async function getAll(req, res) {
  try { res.json(await Restaurant.find().sort({ _id: 1 })); }
  catch (error) { res.status(500).json({ message: 'Unable to fetch restaurants', error: error.message }); }
}

async function getOne(req, res) {
  try {
    const restaurant = await Restaurant.findById(Number(req.params.id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch { res.status(400).json({ message: 'Invalid restaurant ID' }); }
}

async function create(req, res) {
  try {
    const missing = validateRestaurant(req.body);
    if (missing.length) return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
    const restaurant = await Restaurant.create({ _id: await nextId('restaurants'), ...req.body });
    res.status(201).json(restaurant);
  } catch (error) { res.status(500).json({ message: 'Unable to create restaurant', error: error.message }); }
}

async function update(req, res) {
  try {
    const allowed = ['name', 'city', 'address', 'cuisine', 'rating'];
    const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    changes.updatedAt = new Date();
    const restaurant = await Restaurant.findByIdAndUpdate(Number(req.params.id), changes, { new: true, runValidators: true });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) { res.status(400).json({ message: 'Unable to update restaurant', error: error.message }); }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    await MenuItem.deleteMany({ restaurantId: id });
    res.json({ message: 'Restaurant deleted successfully' });
  } catch { res.status(400).json({ message: 'Invalid restaurant ID' }); }
}

module.exports = { getAll, getOne, create, update, remove };
