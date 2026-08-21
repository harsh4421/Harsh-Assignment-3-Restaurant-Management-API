# Restaurant Management API

A RESTful Restaurant Management API built using Node.js, Express.js, MongoDB, and Mongoose.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- REST API

## Features

### Restaurant Management

- Get all restaurants
- Get restaurant by ID
- Create a restaurant
- Update a restaurant
- Delete a restaurant

### Menu Management

- Get menu items for a restaurant
- Create menu items
- Update menu items
- Delete menu items

## API Endpoints

### Restaurants

| Method | Endpoint | Description |
|---|---|---|
| GET | `/restaurants` | Get all restaurants |
| GET | `/restaurants/:id` | Get restaurant by ID |
| POST | `/restaurants` | Create restaurant |
| PUT | `/restaurants/:id` | Update restaurant |
| DELETE | `/restaurants/:id` | Delete restaurant |

### Menu

| Method | Endpoint | Description |
|---|---|---|
| GET | `/restaurants/:id/menu` | Get restaurant menu |
| POST | `/menu` | Create menu item |
| PUT | `/menu/:id` | Update menu item |
| DELETE | `/menu/:id` | Delete menu item |

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=10000
