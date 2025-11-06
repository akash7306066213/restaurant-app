import { useState } from "react";

export default function Category({ onSelectCategory }) {
  
  const categories = ["Pizza", "Burger", "Biryani", "Desserts", "Drinks"];

  const [activeCat, setActiveCat] = useState("Pizza");

  const selectCategory = (cat) => {
    setActiveCat(cat);
    onSelectCategory(cat);
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">Categories</h2>

      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={
              `px-5 py-2 rounded-full font-semibold transition ` +
              (activeCat === cat 
                ? "bg-[#FF6B35] text-white"      // active state
                : "bg-gray-200 text-black hover:bg-gray-300" // normal
              )
            }
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
