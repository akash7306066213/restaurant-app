import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Category from "../components/Category";
import MenuList from "../components/MenuList";
import CartModal from "../components/CartModal";

function Home({ openLogin, openProfile }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [showCart, setShowCart] = useState(false);

  // 🔥 Ref to scroll to MenuList section
  const menuRef = useRef(null);

  // 🔥 Smooth scrolling function
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCategory = (id, name) => {
    setSelectedCategory(id);
    setCategoryName(name);
  };

  return (
    <div>
      <Navbar
        openLogin={openLogin}
        openProfile={openProfile}
        openCart={() => setShowCart(true)}
        scrollToMenu={scrollToMenu}   // <-- pass function
      />

      <Banner />
      <Category onSelectCategory={handleSelectCategory} />

      {/* 🔥 This is the target section for smooth scrolling */}
      <div ref={menuRef}>
        <MenuList categoryId={selectedCategory} categoryName={categoryName} />
      </div>

      {showCart && <CartModal close={() => setShowCart(false)} />}
    </div>
  );
}

export default Home;
