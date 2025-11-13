import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { createOrder, verifyPayment } from "../api/PaymentService";

export default function CartModal({ close }) {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const { user } = useAuth();

  // Calculate total safely
  const total = (cartItems || [])
    .filter((c) => c && c.price)
    .reduce((sum, c) => sum + c.price * c.qty, 0);

  // 🧾 Place Order Function
  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setPlacingOrder(true);

      // 1️⃣ Create Razorpay Order (backend)
      const orderData = await createOrder(total, user.id, cartItems);
      console.log("Backend Order Data:", orderData);

      // 2️⃣ Initialize Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount * 100, // in paise
        currency: orderData.currency,
        name: "FoodHub",
        description: "Payment for your order",
        order_id: orderData.razorOrderId,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          const verifyData = {
            appOrderId: orderData.appOrderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await verifyPayment(verifyData);
            alert("✅ Payment successful!");
            clearCart();
            close(); // ✅ Close and unmount modal
          } catch (err) {
            console.error("Verification failed:", err);
            alert("⚠️ Payment verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#FF6B35",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong while starting payment.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // 🧹 Cleanup effect to prevent stuck overlay
  useEffect(() => {
    console.log("CartModal mounted");
    return () => console.log("CartModal unmounted ✅");
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end items-center z-50"
      onClick={close} // close when clicking outside
    >
      <div
        className="bg-white w-[400px] h-full shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={close} className="text-gray-600 text-2xl">✕</button>
        </div>

        {/* CART CONTENT */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty 🛒</p>
        ) : (
          <>
            <ul>
              {cartItems.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/64?text=No+Img")
                      }
                    />
                    <div>
                      <h3 className="font-semibold">{c.name}</h3>
                      <p className="text-gray-600">₹{c.price}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => updateQty(c.id, c.qty - 1)}
                          className="px-2 border rounded"
                        >
                          −
                        </button>
                        <span>{c.qty}</span>
                        <button
                          onClick={() => updateQty(c.id, c.qty + 1)}
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold">
                      ₹{c.price * c.qty}
                    </span>
                    <button
                      onClick={() => removeFromCart(c.id)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* TOTAL + BUTTONS */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between mt-5">
                <button
                  onClick={clearCart}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                >
                  Clear
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="bg-[#FF6B35] hover:bg-[#e65c25] text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
                >
                  {placingOrder ? "Placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
