import client from "./client";

// ✅ Create Razorpay order
export async function createOrder(amount, userId, cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Cart is empty or invalid");
  }

  // ✅ Match structure from CartContext (id, name, price, qty)
  const payload = {
    amount, // in rupees
    userId,
    items: cartItems.map((c) => ({
      menuItemId: c.id,      // ✅ previously c.menuItem.id
      name: c.name,
      price: c.price,
      quantity: c.qty,       // ✅ previously c.quantity
    })),
  };

  const res = await client.post("/api/payment/create-order", payload);
  return res.data; // { razorOrderId, appOrderId, amount, key, currency }
}

// ✅ Verify Razorpay payment
export async function verifyPayment(data) {
  const res = await client.post("/api/payment/verify", data);
  return res.data;
}
