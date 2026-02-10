import { Link } from "@tanstack/react-router";
import { useAuth } from "../../providers/auth-provider";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { user, isOwner, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-orange-500 text-white">
      {/* Logo */}
      <h1 className="font-bold text-xl">Biryani House</h1>

      {/* Links */}
      <div className="flex items-center space-x-5">
        <Link to="/">Home</Link>
        <Link to="/products">Menu</Link>

        {user && user.role === "customer" && <Link to="/cart">Cart</Link>}
        {user && user.role === "customer" && <Link to="/orders">My Orders</Link>}
        {isOwner && <Link to="/admin">Admin Panel</Link>}

        {/* Auth */}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-white text-indigo-600 font-bold flex items-center justify-center uppercase"
            >
              {user.name?.charAt(0)}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
