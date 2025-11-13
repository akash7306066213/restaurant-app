import { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

export default function CartProvider({ children }) {
  // 🛒 store all cart items here
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load saved cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add item to cart (or update quantity if exists)
  const addToCart = (item, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      } else {
        return [...prev, { ...item, qty }];
      }
    });
  };

  // ➖ Remove an item completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔄 Update quantity (used in CartModal)
  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  };

  // 🧹 Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // 🧮 Total item count (for navbar badge)
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartCtx.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}
