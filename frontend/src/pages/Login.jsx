import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { handleError, handleSuccess } from "../utils/tostify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setloginInfo(copyLoginInfo);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and Password are required");
    }

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await res.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => Navigate("/home"), 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details || "Signup failed");
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative transition-all duration-300 ${
        darkMode ? "dark bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-black/70"></div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-md bg-white/20 dark:bg-black/40 text-white font-semibold hover:bg-white/30 dark:hover:bg-black/50 transition"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/30 rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md text-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-2 drop-shadow-sm">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-300">
            Login to access your dashboard 🚀
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-200"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-200"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300 font-semibold text-white text-lg shadow-md"
        >
          Login
        </button>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-3 text-center">
          <Link to="#" className="text-sm text-purple-300 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </motion.form>
      <ToastContainer />
    </div>
  );
};

export default Login;
