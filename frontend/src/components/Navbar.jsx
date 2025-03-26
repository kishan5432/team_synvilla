import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // Added missing state
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  // Update this to listen for changes to localStorage
  useEffect(() => {
    const checkUserStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Use profilePic directly from localStorage if available
        if (parsedUser.profilePic) {
          setProfileImage(parsedUser.profilePic);
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
    };

    // Check initially
    checkUserStatus();

    // Set up event listener for storage changes
    window.addEventListener("storage", checkUserStatus);

    // Custom event for login/logout within the same window
    window.addEventListener("userStateChanged", checkUserStatus);

    return () => {
      window.removeEventListener("storage", checkUserStatus);
      window.removeEventListener("userStateChanged", checkUserStatus);
    };
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(null); // Close dropdown

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("userStateChanged"));

    navigate("/");
  };

  // Add this function to handle user actions
  const handleUserAction = (path) => {
    navigate(path);
    setIsOpen(null); // Close dropdown after action
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const categories = {
        "new arrival": "/new-arrival",
        "living area": "/living-area",
        bedroom: "/bedroom",
        "garden area": "/garden-area",
        bd: "/bedroom",
        la: "/living-area",
        ga: "/garden-area",
      };

      const searchTerm = searchQuery.toLowerCase();
      if (categories[searchTerm]) {
        navigate(categories[searchTerm]);
      } else {
        navigate("/not-found"); // Redirects to a not-found page if category is invalid
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <NavLink
          to="/"
          className="text-xl font-bold text-gray-700"
          onClick={handleNavClick}
        >
          <h1 className="text-4xl font-extrabold text-[#5A3E36] tracking-wide">
            Syn<span className="text-[#A0522D]">Villa</span>
          </h1>
        </NavLink>

        <button
          className="md:hidden text-gray-600 hover:text-[#A0522D]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul
          className={`md:flex space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/new-arrival"
              className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2"
              onClick={handleNavClick}
            >
              {" "}
              Timeless Picks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/living-area"
              className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2"
              onClick={handleNavClick}
            >
              Lounge & Comfort
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bedroom"
              className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2"
              onClick={handleNavClick}
            >
              Dreamscape Haven
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/garden-area"
              className="block text-gray-700 hover:text-[#A0522D] font-semibold py-2"
              onClick={handleNavClick}
            >
              {" "}
              Nature's Retreat
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:block w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setIsOpen(isOpen === "user" ? null : "user")}
              className="text-gray-600 hover:text-[#A0522D]"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#A0522D]"
                />
              ) : (
                <FaUser size={24} />
              )}
            </button>
            {isOpen === "user" && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-32 z-10">
                {user ? (
                  <>
                    <button
                      onClick={() => handleUserAction("/profile")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      {user.fullName}
                    </button>
                    <button
                      onClick={() => handleUserAction("/edit-profile")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleUserAction("/login")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleUserAction("/signup")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="text-gray-600 hover:text-[#A0522D]"
          >
            <FaShoppingCart size={24} />
            {/* {cart.length() > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )} */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
