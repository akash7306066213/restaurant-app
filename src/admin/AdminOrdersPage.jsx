import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Load all admin orders
  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load admin orders:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Total Amount</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border text-center">Expand</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <>
                {/* MAIN ROW */}
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(order.orderId)}
                >
                  <td className="p-3 border">{order.orderId}</td>
                  <td className="p-3 border">{order.userName}</td>
                  <td className="p-3 border">{order.userEmail}</td>
                  <td className="p-3 border font-semibold">₹{order.totalAmount}</td>
                  <td className="p-3 border">{order.paymentStatus}</td>
                  <td className="p-3 border text-center">
                    {expandedOrderId === order.orderId ? (
                      <FaChevronUp size={18} />
                    ) : (
                      <FaChevronDown size={18} />
                    )}
                  </td>
                </tr>

                {/* EXPANDED ROW */}
                {expandedOrderId === order.orderId && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="p-4 border">
                      <h3 className="text-lg font-semibold mb-3">Order Items</h3>

                      {order.items.map((item) => (
                        <div
                          key={item.menuItemId}
                          className="flex items-center gap-4 p-3 border rounded-lg mb-3 bg-white shadow-sm"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.menuItemName}
                            className="w-20 h-20 rounded object-cover"
                          />

                          <div className="flex-1">
                            <p className="font-semibold text-lg">{item.menuItemName}</p>
                            <p className="text-gray-600 text-sm">
                              Category: <b>{item.categoryName}</b>
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">₹{item.price}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                            <p className="font-bold text-green-600">
                              Total: ₹{item.totalPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
