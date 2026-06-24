# 🍽️ Zomato Clone (Full Stack Project)

## 📌 Overview

This is a Zomato Clone project built with a focus on modern web development practices. The project includes a responsive frontend UI and a backend setup using Node.js, Express, and MongoDB for handling CRUD operations.

---

## 🚀 Features

* Responsive Zomato-like UI
* Navbar with logo and authentication buttons
* Login & Signup pages
* Dark mode support 🌙
* Backend setup with Express & MongoDB
* CRUD operations for Food items

---

## 📁 Project Structure

```
```bash
100_days_100_web_project/
└── public/
    └── zomato-clone/
        ├── public/
        │   ├── css/
        │   │   ├── footer.css
        │   │   ├── navbar.css
        │   │   ├── restaurant.css
        │   │   ├── restaurantDetail.css
        │   │   └── index.css
        │   ├── images/
        │   ├── login.html
        │   └── signup.html
        │
        ├── server/
        │   ├── config/
        │   ├── controllers/
        │   ├── models/
        │   ├── routes/
        │   ├── seed/
        │   ├── .env.example
        │   └── server.js
        │
        ├── views/
        │   ├── partials/
        │   │   ├── footer.ejs
        │   │   └── navbar.ejs
        │   ├── index.ejs
        │   ├── restaurant.ejs
        │   └── restaurantDetail.ejs
        │
        ├── .gitignore
        ├── package.json
        ├── package-lock.json
        ├── README.md
        └── .env.example
```

---

## 🛠️ Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MongoDB
* Tools: Git, GitHub

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd zomato-clone
```

### 2️⃣ Install dependencies

```
npm install express-rate-limit
npm install
npm install mongoose
npm install express
npm install cors
npm install dotenv
```

### 3️⃣ Run the server

```
node server/server.js
```

### 4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🔥 API Endpoints (Food CRUD)

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | /api/food     | Create food item |
| GET    | /api/food     | Get all foods    |
| PUT    | /api/food/:id | Update food      |
| DELETE | /api/food/:id | Delete food      |

---
## 🍽️ Restaurant Detail Page

When a user clicks on a restaurant card, they are redirected to the detail page.

* Displays restaurant name, ratings, address, and timings
* Shows images and “View Gallery” option
* Includes tabs: Overview, Order Online, Photos, and Menu
* Menu and details are dynamically rendered using backend data

This page allows users to explore restaurant details and view the menu easily.


## 📌 Notes

* All frontend files are served from the `public` folder
* Backend is structured using MVC pattern (Model-View-Controller)
* Project is under active development 🚧

---

## 🤝 Contribution

Feel free to fork this repository and contribute by creating pull requests.

---

## ⭐ Acknowledgement

Inspired by the Zomato UI design.
see in local 
mongosh
show dbs
use zomato
show collections
