import React from 'react'
import { smoothScrollTo } from "../utils/smoothScroll";

function Banner() {

 const scrollToMenu = () => {
  const menuSection = document.getElementById("menu");
  if(menuSection) smoothScrollTo(menuSection, 800);
};


  return (
    <section className="bg-[#FFF7ED] w-full pt-24 pb-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-8">

        {/* LEFT TEXT */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
            Delicious Food Delivered <br/> To Your Doorstep
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Order tasty food anytime. Fast delivery, great taste.
          </p>

          <div className="mt-6 flex gap-4">
            <button 
              onClick={scrollToMenu}
              className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
              Order Now
            </button>

            <button 
              onClick={scrollToMenu}
              className="border-2 border-[#FF6B35] text-[#FF6B35] px-6 py-3 rounded-lg font-bold hover:bg-[#FF6B35] hover:text-white transition">
              Explore Menu
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="food-banner" 
            className="rounded-2xl shadow-xl"
          />
        </div>

      </div>
    </section>
  )
}

export default Banner
