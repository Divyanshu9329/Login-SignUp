# 🔐 Login & Signup App (MERN Stack)

A simple **Login & Signup system** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project demonstrates user authentication with JWT tokens, secure password hashing, and a clean frontend UI.  

---

## 🚀 Features
- User **Signup** with hashed password storage (bcrypt)
- User **Login** with JWT authentication
- MongoDB Atlas integration
- CORS-enabled backend for frontend connection
- Ready to deploy on **Render (backend)** and **Vercel (frontend)**

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite + TailwindCSS (deployed on Vercel)
- **Backend**: Node.js + Express + MongoDB (deployed on Render)
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)

---

## 📦 Installation & Setup (Local)

1. Clone the repository
   bash
   git clone https://github.com/Divyanshu9329/Login-SignUp.git
   cd Login-SignUp


2. Install dependencies for both frontend & backend

   bash
   cd Backend
   npm install

   cd ../Frontend
   npm install
   

3. Add environment variables
   Create a `.env` file inside **Backend**:

   env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   PORT=5000
   

4. Run the backend

   bash
   cd Backend
   npm start
   

5. Run the frontend

   bash
   cd Frontend
   npm run dev
   

Now open **[http://localhost:5173](http://localhost:5173)** 🎉

---

## 🌍 Deployment

* **Backend**: Hosted on [Render](https://render.com/) → [https://login-signup-ycnx.onrender.com](https://login-signup-ycnx.onrender.com)
* **Frontend**: Hosted on [Vercel](https://vercel.com/) → [https://login-sign-up-dusky.vercel.app/home](https://login-sign-up-dusky.vercel.app/home)

---

## 📬 API Endpoints (Backend)

* **POST** `/auth/signup` → Register a new user
* **POST** `/auth/login` → Login with email & password

Example request (login):

json
{
  "email": "user@example.com",
  "password": "mypassword"
}


---

## 💡 Future Improvements

* Add role-based authentication (Admin/User)
* Forgot password & email verification
* Better error handling & validations

---

## 🧑‍💻 Author

Made with ❤️ by [Divyanshu Pandey](https://github.com/Divyanshu9329)

Do you want me to make this **more professional (like open-source projects)** or keep it **casual and beginner-friendly** for recruiters to quickly understand?
```
