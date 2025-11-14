import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersModal({ close, userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      console.log("Loading orders for userId:", userId);
      const res = await axios.get(`http://localhost:8080/api/orders/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-white w-[450px] max-h-[85vh] rounded-lg shadow-xl p-5 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold">My Orders</h2>
          <button className="text-xl" onClick={close}>✕</button>
        </div>

        {/* CONTENT */}
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No orders found.</p>
        ) : (
          <div className="space-y-5 mt-4">
            {orders.map((order) => (
              <div key={order.orderId} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Order #{order.orderId}</p>

                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    order.paymentStatus === "PAID" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>

                {/* ITEMS */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b py-2">
                    <div>
                      <p className="font-semibold">{item.menuItemName}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.totalPrice}</p>
                  </div>
                ))}

                <div className="flex justify-between font-bold mt-3 text-lg">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
