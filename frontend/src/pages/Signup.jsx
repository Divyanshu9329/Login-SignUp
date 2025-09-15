import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/tostify";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState(
    { name: "",
      email: "",
      password: "" }
  );
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError("Name, Email and Password are required");
    }

    try {
      const res = await fetch("http://localhost:3030/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => Navigate("/login"), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || "Signup failed");
      } else {
        handleError(message || "Something went wrong");
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative transition-all duration-300 ${
        darkMode ? "dark bg-white" : "bg-black"
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-black/70"></div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-md bg-white/20 dark:bg-black/40 text-white font-semibold hover:bg-white/30 dark:hover:bg-black/50 transition"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/30 rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md text-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-2 drop-shadow-sm">Create Account</h2>
          <p className="text-sm text-gray-300">Join us and explore the magic 🎉</p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-200">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-200"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-200"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-200">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-200"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300 font-semibold text-white text-lg shadow-md"
        >
          Sign Up
        </button>

        {/* Already have account */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </motion.form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
