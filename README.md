# MERN Blog

## 🌟 Overview

This is a **full-stack blogging platform** built with the **MERN stack** (MongoDB, Express, React, Node.js). It features a **fully functional admin panel**, a user-friendly dashboard, and a dynamic post management system. The platform allows users to **create, read, update, and delete posts**, interact through comments and likes, and organize content using tags.

**Live Link:** https://hello-dev.onrender.com/

## 🚀 Features

### **🔹 Admin Panel**

- Create and publish blog posts (stored in **MongoDB** and fetched dynamically).
- Update existing posts.
- **Dashboard Overview** displaying:
  - Total posts
  - Total views, comments, and likes
  - Recently added posts
  - Popular posts
- A dedicated section for **post details, user details, and comment details**.

### **🔹 User Dashboard**

- **Profile management**: Update profile picture, name, reset password, or delete account.
- View **liked posts** and **bookmarked posts** in separate tabs.

### **🔹 Home Page**

- Browse and read posts.
- Sign in & sign up functionality.

### **🔹 Topics Page**

- Filter posts based on **tags**.

### **🔹 Post Page (Reading View)**

- **Dynamic stats**: View count and like count for the post.
- **Social sharing options**: Share via:
  - **Copy Link**
  - **WhatsApp**
  - **LinkedIn**
  - **X (formerly Twitter)**
  - **Email**
- **Bookmark button** for saving posts.
- **Fully functional comment system** (comment, edit, delete, like comments).
- Code snippets are **highlighted using Highlight.js **for better readability.

### **🔹 Authentication & Security**

- **JWT authentication** for sign-in & sign-up.
- **OAuth authentication** with **Passport.js**.

## 🛠️ Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT, Passport.js (OAuth)
- **Syntax Highlighting:** Highlight.js

## 📂 Folder Structure
```
📦 project-root
 ┣ 📂 api                   # Backend (Node.js, Express, MongoDB)
 ┃ ┣ 📂 config              # Configuration files (e.g., database connection, environment variables)
 ┃ ┣ 📂 controllers         # Handles business logic and request processing
 ┃ ┣ 📂 models              # Defines MongoDB schemas and database interactions
 ┃ ┣ 📂 routes              # API endpoints and route handling
 ┃ ┣ 📂 utils               # Utility functions and helper methods
 ┃ ┣ index.js               # Entry point for the backend server
 ┣ 📂 client                # Frontend (React, Redux, Tailwind CSS)
 ┃ ┣ 📂 public              # Static files (e.g., favicon, images, index.html)
 ┃ ┣ 📂 src                 # Main source code for the frontend
 ┃ ┃ ┣ 📂 components       # Reusable UI components
 ┃ ┃ ┣ 📂 pages            # Page-level components for routing
 ┃ ┃ ┣ 📂 redux            # Redux store, slices, and actions
 ┃ ┃ ┣ App.js              # Root component of the React application
 ┃ ┃ ┣ index.css           # Global styles for the application
 ┃ ┃ ┣ index.js            # Entry point for the frontend React app
 ┃ ┃ ┣ .gitignore          # Specifies files and directories to ignore in Git
 ┃ ┃ ┣ package-lock.json   # Auto-generated lockfile for dependency management
 ┃ ┃ ┣ package.json        # Defines project dependencies and scripts
 ┃ ┃ ┣ README.md           # Documentation for the frontend project
 ┃ ┃ ┣ tailwind.config.js  # Tailwind CSS configuration file
 ┣ .gitignore              # Specifies ignored files and directories for Git
 ┣ package-lock.json       # Lockfile to ensure consistent dependency versions
 ┣ package.json            # Project metadata, dependencies, and scripts
```

## 🛠️ Setup & Installation

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### **2️⃣ Install dependencies**

```sh
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

### **3️⃣ Set up environment variables**

Create a `.env` file in the `api` directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### **4️⃣ Run the project**

```sh
# Start backend
npm run dev

# Start frontend
cd ../client
npm start
```

## 🚀 Future Enhancements

- Dedicated roadmaps for better clarity
- Dark mode support
- Improved admin analytics dashboard

## 📜 License

⚠️ **This project is open-source for learning purposes only.** Unauthorized use for job applications or commercial purposes is **strictly prohibited**.
