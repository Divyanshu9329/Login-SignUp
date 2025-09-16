import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/tostify";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setUser(storedUser);

    if (storedUser) {
      fetchProducts();
    }
  }, []);

  // Fetch products if logged in
  const fetchProducts = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      // on system api = http://localhost:3030/products
      const res = await fetch(`${API}/products`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await res.json();
      setProducts(result);
    } catch (err) {
      handleError("Failed to fetch products");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setProducts([]);
    handleSuccess("Logged out successfully");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-indigo-800 text-white px-4">
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 drop-shadow">Welcome to the App</h1>
        <p className="text-2xl mb-6">
          {user ? `Hello, ${user}! ` : "You're not logged in."}
        </p>

        {/* Login / Logout Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        )}

        {/* Products */}
        {user && products.length > 0 && (
          <div className="mt-8 text-left">
            <h2 className="text-xl font-semibold mb-4">🛒 Products</h2>
            <ul className="space-y-2">
              {products.map((item, index) => (
                <li
                  key={index}
                  className="bg-white/20 px-4 py-2 rounded-lg flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <span className="font-bold">${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
