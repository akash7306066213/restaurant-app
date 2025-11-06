import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { smoothScrollTo } from "../utils/smoothScroll";

function Navbar({ openLogin, cartCount }) {

  // scroll to menu section
  const scrollToMenu = () => {
  const menuSection = document.getElementById("menu");
  if(menuSection) smoothScrollTo(menuSection, 1200); // 1200ms = 1.2 second
};


  return (
    <header className="fixed top-0 left-0 w-full bg-[#FF6B35] text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold tracking-wide">FoodHub</h1>

        <nav className="flex items-center gap-8 font-semibold">

          <button className="hover:text-black transition">
            Home
          </button>

          <button onClick={scrollToMenu} className="hover:text-black transition">
            Menu
          </button>

          {/* Cart icon + badge */}
          <button className="relative flex items-center gap-2 hover:text-black transition">
            <FaShoppingCart size={22} />
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#FF6B35] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={openLogin}
            className="bg-white text-[#FF6B35] px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
            Login
          </button>

        </nav>
      </div>
    </header>
  )
}

export default Navbar
