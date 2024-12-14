import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import avatarIMG from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Order", href: "/orders" },
  { name: "Cart Item", href: "/cart" },
  { name: "Login", href: "/login" },
  { name: "User Dashboard", href: "/user-dashboard" },
];
const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {currentUser, logout} = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <header className=" mx-auto max-w-screen-2xl px-4 py-6">
      <nav className=" flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-16">
          <Link to="/">
            <RiMenu2Line className="size-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <span className="absolute inline-block inset-y-2  left-3">
              <IoSearchOutline />
            </span>
            <input
              type="text"
              className="px-6 bg-[#EAEAEA] rounded-md focus:outline-none w-full py-1 md:px-8"
              placeholder="What are you lookng for"
            />
          </div>
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatarIMG}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-4">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> Logout </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaRegUser className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <FaRegHeart className="size-6" />
          </button>
          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
            <IoCartOutline className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm ml-1 ">{cartItems.length}</span>
            ) : (
              <span className="text-sm ml-1 ">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
