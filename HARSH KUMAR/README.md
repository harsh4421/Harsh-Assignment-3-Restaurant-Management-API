# Restaurant Management API

A RESTful Restaurant Management API built using Node.js, Express.js, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- Postman
- Render

## Features

### Restaurant Management

- Create a restaurant
- Get all restaurants
- Get a restaurant by ID
- Update restaurant details
- Delete a restaurant

### Menu Management

- Add menu items
- Get menu items for a restaurant
- Update menu items
- Delete menu items

## Project Structure

```text
restaurant-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── menuController.js
│   └── restaurantController.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   ├── Menu.js
│   └── Restaurant.js
│
├── routes/
│   ├── menuRoutes.js
│   └── restaurantRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js