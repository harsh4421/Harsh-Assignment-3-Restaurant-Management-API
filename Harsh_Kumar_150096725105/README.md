# Restaurant Management API

A full-stack Restaurant Management System developed using **Node.js, Express.js, MongoDB, and React**.

The application provides a RESTful API for user authentication, restaurant management, and menu item management. A React + Vite frontend is also included for interacting with the API through a simple web interface.

---

## Features

### Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected restaurant and menu operations

### Restaurant Management
- View all restaurants
- View a restaurant by ID
- Create a restaurant
- Update restaurant information
- Delete a restaurant
- Automatic deletion of associated menu items when a restaurant is deleted

### Menu Management
- View menu items for a restaurant
- Add menu items
- Update menu items
- Delete menu items
- Track menu item availability

### Frontend
- React-based user interface
- Login and registration
- Restaurant listing
- Add restaurant
- Edit restaurant
- Delete restaurant
- Add menu items
- Delete menu items
- JWT token stored in browser local storage
- Responsive interface using CSS

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS
- Nodemon

### Frontend

- React 19
- Vite
- JavaScript
- HTML
- CSS
- Fetch API

---

## Project Structure

```text
Restaurant-Management-API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authcontroller.js
│   ├── menucontroller.js
│   └── restaurantcontroller.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── counter.js
│   ├── menuitems.js
│   ├── restaurant.js
│   └── users.js
│
├── routes/
│   ├── authroutes.js
│   ├── menuroutes.js
│   └── restaurantroutes.js
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .env.example
├── .gitignore
├── Assignment 3.txt
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js 18 or later
- npm
- MongoDB or MongoDB Atlas
- Git

---

## Backend Setup

### 1. Install Dependencies

Open a terminal in the project root:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as a reference.

Example:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_management
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
```

The `.env` file contains sensitive configuration and should **not** be uploaded to GitHub.

### 3. Start the Backend

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The backend will normally run at:

```text
http://localhost:3000
```

The root endpoint can be checked at:

```text
GET /
```

Expected response:

```json
{
  "message": "Restaurant Management API is running"
}
```

---

## Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide the frontend URL in the terminal.

Normally it will be:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login an existing user | No |

### Register

```http
POST /auth/register
```

Request body:

```json
{
  "username": "harsh",
  "email": "harsh@example.com",
  "password": "password123"
}
```

A successful registration returns a JWT token and user information.

### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "harsh@example.com",
  "password": "password123"
}
```

A successful login returns a JWT token.

---

## Restaurant Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/restaurants` | Get all restaurants | No |
| GET | `/restaurants/:id` | Get restaurant by ID | No |
| POST | `/restaurants` | Create restaurant | Yes |
| PUT | `/restaurants/:id` | Update restaurant | Yes |
| DELETE | `/restaurants/:id` | Delete restaurant | Yes |

### Create Restaurant

```http
POST /restaurants
```

Request body:

```json
{
  "name": "Spice Garden",
  "city": "Mumbai",
  "address": "Kharghar, Navi Mumbai",
  "cuisine": "Indian",
  "rating": 4.5
}
```

The following fields are required:

- `name`
- `city`
- `address`
- `cuisine`

`rating` is optional and must be between `0` and `5`.

### Get All Restaurants

```http
GET /restaurants
```

Returns all restaurant records.

### Get Restaurant by ID

```http
GET /restaurants/:id
```

Returns a specific restaurant.

### Update Restaurant

```http
PUT /restaurants/:id
```

Example request:

```json
{
  "name": "Spice Garden Restaurant",
  "city": "Mumbai",
  "address": "Kharghar, Navi Mumbai",
  "cuisine": "Indian",
  "rating": 4.7
}
```

### Delete Restaurant

```http
DELETE /restaurants/:id
```

Deletes the selected restaurant.

Associated menu items are also deleted when a restaurant is removed.

---

## Menu Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/restaurants/:id/menu` | Get restaurant menu | No |
| POST | `/restaurants/:id/menu` | Add menu item | Yes |
| PUT | `/restaurants/menu/:id` | Update menu item | Yes |
| DELETE | `/restaurants/menu/:id` | Delete menu item | Yes |

### Get Restaurant Menu

```http
GET /restaurants/:id/menu
```

Returns all menu items belonging to the selected restaurant.

### Add Menu Item

```http
POST /restaurants/:id/menu
```

Request body:

```json
{
  "name": "Paneer Tikka",
  "price": 250,
  "isAvailable": true
}
```

Required fields:

- `name`
- `price`

`isAvailable` defaults to `true`.

### Update Menu Item

```http
PUT /restaurants/menu/:id
```

Example:

```json
{
  "name": "Paneer Tikka Special",
  "price": 280,
  "isAvailable": true
}
```

### Delete Menu Item

```http
DELETE /restaurants/menu/:id
```

Deletes the selected menu item.

---

## Authentication

Protected endpoints require a JWT token.

The token must be sent using the `Authorization` header:

```http
Authorization: Bearer <your_token>
```

The authentication middleware verifies the token before allowing access to protected operations.

Protected operations include:

```text
POST   /restaurants
PUT    /restaurants/:id
DELETE /restaurants/:id

POST   /restaurants/:id/menu
PUT    /restaurants/menu/:id
DELETE /restaurants/menu/:id
```

---

## Database

The application uses **MongoDB** with **Mongoose**.

The following models are used:

### User

Stores registered user information.

Fields include:

- `_id`
- `username`
- `email`
- `password`
- `createdAt`

Passwords are hashed using bcrypt before being stored.

### Restaurant

Stores restaurant information.

Fields include:

- `_id`
- `name`
- `city`
- `address`
- `cuisine`
- `rating`
- `createdAt`
- `updatedAt`

### Menu Item

Stores menu information for restaurants.

Fields include:

- `_id`
- `restaurantId`
- `name`
- `price`
- `isAvailable`
- `createdAt`
- `updatedAt`

### Counter

The Counter model is used to generate numeric IDs for:

- Users
- Restaurants
- Menu items

---

## Application Flow

```text
                    ┌─────────────────┐
                    │  React Frontend │
                    └────────┬────────┘
                             │
                             │ HTTP Requests
                             ▼
                    ┌─────────────────┐
                    │  Express Server │
                    └────────┬────────┘
                             │
                             ▼
                       ┌───────────┐
                       │   Routes  │
                       └─────┬─────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Middleware    │
                    │ JWT Validation  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Controllers   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Mongoose Models │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     MongoDB     │
                    └─────────────────┘
```

---

## Frontend

The frontend is built using React and Vite.

The main frontend features include:

- User registration
- User login
- Restaurant listing
- Restaurant selection
- Restaurant creation
- Restaurant editing
- Restaurant deletion
- Menu item creation
- Menu item deletion
- Logout
- Authentication state management

The frontend communicates with the backend using the Fetch API.

The API URL can be configured using:

```env
VITE_API_URL=http://localhost:3000
```

If `VITE_API_URL` is not provided, the frontend uses:

```text
http://localhost:3000
```

as the default backend URL.

---

## Testing

The backend API can be tested using:

- Postman
- Thunder Client
- Insomnia
- Browser for GET requests

### Recommended Testing Flow

```text
1. Start MongoDB
       ↓
2. Start Backend
       ↓
3. Register a user
       ↓
4. Login
       ↓
5. Copy the JWT token
       ↓
6. Create a restaurant
       ↓
7. View restaurants
       ↓
8. Update restaurant
       ↓
9. Add menu item
       ↓
10. Update/Delete menu item
       ↓
11. Delete restaurant
```

---

## Error Handling

The API handles common errors including:

- Missing required fields
- Invalid restaurant IDs
- Invalid menu item IDs
- Restaurant not found
- Menu item not found
- Duplicate email registration
- Invalid login credentials
- Missing authentication token
- Invalid or expired JWT token
- Database connection errors
- Invalid requests

The API returns appropriate HTTP status codes such as:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
500 Internal Server Error
```

---

## Environment Variables

The project uses environment variables for database and authentication configuration.

Example `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_management
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=1d
```

### Important

Do not commit your actual `.env` file.

The `.gitignore` file excludes:

```text
.env
node_modules/
*.log
.DS_Store
```

Only `.env.example` should be included in the repository.

---

## Running the Complete Project

### Terminal 1 — Backend

From the project root:

```bash
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd Frontend
npm install
npm run dev
```

Then open the frontend URL provided by Vite.

---

## NPM Scripts

### Backend

```bash
npm start
```

Starts the backend using Node.js.

```bash
npm run dev
```

Starts the backend using Nodemon for development.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build of the frontend.

```bash
npm run preview
```

Previews the production build locally.

---

## Security

The application implements basic security practices including:

- Password hashing using bcryptjs
- JWT authentication
- Protected API routes
- Environment variables for secrets
- `.env` excluded from Git
- Authentication token validation through middleware

---

## Future Improvements

The project can be extended with:

- Restaurant search
- Restaurant filtering by city
- Cuisine-based filtering
- Menu categories
- Restaurant reviews and ratings
- Image uploads
- Pagination
- Admin dashboard
- Role-based access control
- Order management
- Reservation management
- Improved frontend validation
- Loading states and better error messages

---

## Assignment

**Assignment 3: Restaurant Management API**

The assignment implements:

- Authentication
- Restaurant CRUD operations
- Menu item management
- Protected routes
- MongoDB database integration
- REST API
- Frontend interface

---

