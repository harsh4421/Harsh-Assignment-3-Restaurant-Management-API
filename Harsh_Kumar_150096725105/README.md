# Restaurant Management API

A full-stack restaurant management application built with Node.js, Express.js, MongoDB, JWT authentication, and React. Authenticated users can manage restaurants and their menu items through a REST API and a small React frontend.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Restaurant CRUD operations
- Menu item CRUD operations
- Numeric IDs generated through a counter collection
- MongoDB persistence using Mongoose
- React frontend for authentication and restaurant management
- Protected write operations
- CORS and JSON request handling

## Project Structure

```text
Harsh-Assignment-3-Restaurant-Management-API/
├── config/
│   └── db.js
├── controllers/
│   ├── authcontroller.js
│   ├── menucontroller.js
│   └── restaurantcontroller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── counter.js
│   ├── menuitems.js
│   ├── restaurant.js
│   └── users.js
├── routes/
│   ├── authroutes.js
│   ├── menuroutes.js
│   └── restaurantroutes.js
├── Frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

### Frontend

- React 19
- Vite
- JavaScript
- CSS

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB local instance or MongoDB Atlas

## Backend Setup

From the project root:

```bash
npm install
```

Create a `.env` file from `.env.example` and set your MongoDB connection string and JWT secret:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
```

Start the API:

```bash
npm run dev
```

The API is available at `http://localhost:3000`.

## Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The Vite development server will display its local URL, normally `http://localhost:5173`.

If the backend runs somewhere else, create `Frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a user |
| POST | `/auth/login` | No | Login and receive a JWT |

### Restaurants

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/restaurants` | No | Get all restaurants |
| GET | `/restaurants/:id` | No | Get one restaurant |
| POST | `/restaurants` | Yes | Create a restaurant |
| PUT | `/restaurants/:id` | Yes | Update a restaurant |
| DELETE | `/restaurants/:id` | Yes | Delete a restaurant and its menu |

### Menu Items

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/restaurants/:id/menu` | No | Get a restaurant's menu |
| POST | `/restaurants/:id/menu` | Yes | Add a menu item |
| PUT | `/restaurants/menu/:id` | Yes | Update a menu item |
| DELETE | `/restaurants/menu/:id` | Yes | Delete a menu item |

Protected requests require:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Example Requests

### Register

```json
{
  "username": "harsh",
  "email": "harsh@example.com",
  "password": "password123"
}
```

### Create Restaurant

```json
{
  "name": "The Spice Table",
  "city": "Mumbai",
  "address": "MG Road, Mumbai",
  "cuisine": "Indian",
  "rating": 4.5
}
```

### Add Menu Item

```json
{
  "name": "Paneer Tikka",
  "price": 280,
  "isAvailable": true
}
```

## Database Schema

### User

- `_id`: Number
- `username`: String
- `email`: String, unique
- `password`: String, hashed
- `createdAt`: Date

### Restaurant

- `_id`: Number
- `name`: String
- `city`: String
- `address`: String
- `cuisine`: String
- `rating`: Number, optional, 0–5
- `createdAt`: Date
- `updatedAt`: Date

### Menu Item

- `_id`: Number
- `restaurantId`: Number
- `name`: String
- `price`: Number
- `isAvailable`: Boolean, default `true`
- `createdAt`: Date
- `updatedAt`: Date

## Testing

The API can be tested with Thunder Client, Postman, or another HTTP client.

Recommended order:

1. Register a user.
2. Login and copy the returned JWT.
3. Use `Authorization: Bearer <token>` for protected requests.
4. Create a restaurant.
5. Retrieve restaurants.
6. Add menu items to a restaurant.
7. Update restaurant/menu data.
8. Delete menu items or restaurants.

## Security

The `.env` file is excluded from Git. Do not commit MongoDB credentials or JWT secrets.

## License

This project is for educational purposes.
