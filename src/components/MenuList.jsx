import { menuData } from "../data/menuData";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

export default function MenuList({ category }) {

  const items = menuData[category] || [];

  return (
    <section id="menu" className="max-w-7xl mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-2">{category}</h2>
      <p className="text-center text-gray-600 mb-10">
        Choose your favourite {category} items
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}


function MenuCard({ item }) {

  const [qty, setQty] = useState(1);

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer">
      
      {/* IMAGE */}
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
      />

      {/* NAME + PRICE */}
      <div className="text-center px-3 pb-4">
        <h3 className="font-semibold truncate">{item.name}</h3>
        <p className="text-[#FF6B35] font-bold">₹{item.price}</p>
      </div>


      {/* ACTION BAR - only on hover (slide up + opacity) */}
      <div
        className="
          absolute left-0 right-0 bottom-0
          bg-white/90 backdrop-blur
          px-3 py-2
          flex flex-col gap-2
          translate-y-full
          opacity-0
          group-hover:translate-y-0 
          group-hover:opacity-100
          transition-all duration-300
        "
      >
        {/* Quantity */}
        <div className="bg-gray-100 rounded flex items-center justify-center gap-4 py-1 font-semibold">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>

        {/* Add to cart */}
        <button className="bg-[#2BB44A] hover:bg-[#25a043] text-white rounded py-2 font-bold flex items-center justify-center gap-2">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}
