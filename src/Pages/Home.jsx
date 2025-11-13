import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Category from "../components/Category";
import MenuList from "../components/MenuList";
import CartModal from "../components/CartModal";

function Home({ openLogin, openProfile }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [showCart, setShowCart] = useState(false); // ✅ Controls cart modal

  const handleSelectCategory = (id, name) => {
    setSelectedCategory(id);
    setCategoryName(name);
  };

  return (
    <div>
      {/* ✅ Pass openCart to Navbar */}
      <Navbar
        openLogin={openLogin}
        openProfile={openProfile}
        openCart={() => setShowCart(true)}
      />

      <Banner />
      <Category onSelectCategory={handleSelectCategory} />
      <MenuList categoryId={selectedCategory} categoryName={categoryName} />

      {/* ✅ Render CartModal here */}
      {showCart && <CartModal close={() => setShowCart(false)} />}
    </div>
  );
}

export default Home;
