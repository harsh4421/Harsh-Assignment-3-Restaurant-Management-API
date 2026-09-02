const MenuItem = require('../models/menuitems');
const Restaurant = require('../models/restaurant');
const Counter = require('../models/counter');

async function nextId() {
  const counter = await Counter.findOneAndUpdate({ _id: 'menuItems' }, { $inc: { value: 1 } }, { new: true, upsert: true });
  return counter.value;
}

async function list(req, res) {
  try {
    const restaurantId = Number(req.params.id);
    if (!Number.isInteger(restaurantId)) return res.status(400).json({ message: 'Invalid restaurant ID' });
    res.json(await MenuItem.find({ restaurantId }).sort({ _id: 1 }));
  } catch (error) { res.status(500).json({ message: 'Unable to fetch menu', error: error.message }); }
}

async function create(req, res) {
  try {
    const restaurantId = Number(req.params.id);
    if (!(await Restaurant.exists({ _id: restaurantId }))) return res.status(404).json({ message: 'Restaurant not found' });
    const { name, price, isAvailable = true } = req.body;
    if (!name || price === undefined) return res.status(400).json({ message: 'name and price are required' });
    const item = await MenuItem.create({ _id: await nextId(), restaurantId, name, price, isAvailable });
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: 'Unable to create menu item', error: error.message }); }
}

async function update(req, res) {
  try {
    const changes = {};
    for (const key of ['name', 'price', 'isAvailable']) if (req.body[key] !== undefined) changes[key] = req.body[key];
    changes.updatedAt = new Date();
    const item = await MenuItem.findByIdAndUpdate(Number(req.params.id), changes, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (error) { res.status(400).json({ message: 'Unable to update menu item', error: error.message }); }
}

async function remove(req, res) {
  try {
    const item = await MenuItem.findByIdAndDelete(Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch { res.status(400).json({ message: 'Invalid menu item ID' }); }
}

module.exports = { list, create, update, remove };
