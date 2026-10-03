# Clothing E-commerce

A full-stack clothing store. Shoppers register and log in, browse the product catalog and manage a
cart that is stored on the server.

**Stack:** React 19 · React Router · Axios · Node.js · Express 5 · MongoDB (Mongoose) · JWT · bcrypt

**Demo:** [clothing-ecommerce-flax.vercel.app](https://clothing-ecommerce-flax.vercel.app)
(frontend only; the API deployment is offline)

## Structure

```text
backend/    Express REST API: auth, products, cart (MongoDB via Mongoose)
frontend/   React single-page app (Create React App)
```

## API

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/register/` | Create an account (password hashed with bcrypt) |
| `POST` | `/login/` | Log in and receive a JWT |
| `GET` | `/api/products` | List products (auth required) |
| `GET` | `/api/cart` | Get the current user's cart (auth required) |
| `POST` | `/api/cart/add` | Add an item to the cart (auth required) |
| `PUT` | `/api/cart/update` | Change an item's quantity (auth required) |
| `DELETE` | `/api/cart/remove` | Remove an item from the cart (auth required) |

Protected routes accept the JWT as a `Bearer` token or a `token` cookie.

## Running locally

```bash
# API: http://localhost:5000
cd backend
cp .env.example .env        # then set MONGO_URI and JWT_SECRET
npm install
node seedProducts.js        # optional: load sample products
node server.js

# Frontend: http://localhost:3000
cd ../frontend
npm install
npm start
```

For local development, set the API base URL in `frontend/src/service/api.js` and the allowed
CORS origin in `backend/server.js` to your local addresses.
