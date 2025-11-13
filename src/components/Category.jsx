import { useEffect, useState } from "react";
import client from "../api/client";

export default function Category({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);

  // load categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await client.get("/api/menu/categories");
        setCategories(res.data);

        if (res.data.length > 0) {
          const first = res.data[0];
          setActiveCat(first.id);
          onSelectCategory(first.id, first.name); // load first category items
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const selectCategory = (cat) => {
    setActiveCat(cat.id);
    onSelectCategory(cat.id, cat.name);
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">
        Categories
      </h2>

      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => selectCategory(cat)}
            className={
              `px-5 py-2 rounded-full font-semibold transition ` +
              (activeCat === cat.id
                ? "bg-[#FF6B35] text-white shadow-md"
                : "bg-gray-200 text-black hover:bg-gray-300")
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
