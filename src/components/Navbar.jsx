import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";
import { smoothScrollTo } from "../utils/smoothScroll"; // if you created it

function Navbar({ openLogin, openProfile, cartCount = 0 }) {
  const { user } = useAuth();

  const scrollToMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) {
      // use native smooth or your custom helper
      // menu.scrollIntoView({ behavior: "smooth" });
      smoothScrollTo ? smoothScrollTo(menu, 1200) : menu.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#FF6B35] text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">FoodHub</h1>

        <nav className="flex items-center gap-8 font-semibold">
          <button className="hover:text-black transition">Home</button>
          <button onClick={scrollToMenu} className="hover:text-black transition">Menu</button>

          <button className="relative flex items-center gap-2 hover:text-black transition">
            <FaShoppingCart size={22} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#FF6B35] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* If logged in -> show Profile icon; else Login */}
          {user ? (
            <button onClick={openProfile} className="flex items-center gap-2 hover:text-black transition">
              <FaUserCircle size={26} />
              {user.name ?? "Profile"}
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="bg-white text-[#FF6B35] px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
