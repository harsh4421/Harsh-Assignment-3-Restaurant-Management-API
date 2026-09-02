require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Restaurant Management API is running' }));
app.use('/auth', require('./routes/authroutes'));
app.use('/restaurants', require('./routes/restaurantroutes'));
app.use('/restaurants', require('./routes/menuroutes'));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

connectDatabase()
  .then(() => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)))
  .catch(error => { console.error('Database connection failed:', error.message); process.exit(1); });
