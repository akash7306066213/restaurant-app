import { useEffect, useState } from "react";
import client from "../api/client";
import EditMenuModal from "./EditMenuModal";

export default function MenuItems({ sidebarOpen = true }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); // {id,...} or null

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await client.get("/api/admin/menu");
      setItems(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Toggle availability using PATCH /{id}/availability
  const toggleAvailability = async (item) => {
    // optimistic UI
    setItems((prev) =>
      prev.map((it) =>
        it.id === item.id ? { ...it, available: !it.available } : it
      )
    );

    try {
      await client.patch(`/api/admin/menu/${item.id}/availability`);
    } catch (e) {
      // rollback on error
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, available: !it.available } : it
        )
      );
      alert("Failed to update availability");
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    const prev = items;
    setItems((list) => list.filter((x) => x.id !== id));
    try {
      await client.delete(`/api/admin/menu/${id}`);
    } catch (e) {
      setItems(prev);
      alert("Failed to delete item");
    }
  };

  return (
    <div className={`transition-all duration-300 ${sidebarOpen ? "md:ml-0" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Menu Items</h1>
        <button
          onClick={loadItems}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-gray-600 border rounded">
          No menu items yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-[720px] w-full">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price (₹)</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                      {/* small square thumbnail */}
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        className="w-12 h-12 object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/60?text=No+Image";
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{it.name}</td>
                  <td className="px-4 py-3">{it.category?.name || "-"}</td>
                  <td className="px-4 py-3">{Number(it.price).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {/* iPhone-style toggle */}
                    <button
                      onClick={() => toggleAvailability(it)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        it.available ? "bg-green-500" : "bg-gray-300"
                      }`}
                      title={it.available ? "Available" : "Not available"}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                          it.available ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setEditItem(it)}
                        className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editItem && (
        <EditMenuModal
          item={editItem}
          close={() => setEditItem(null)}
          onSaved={() => {
            setEditItem(null);
            loadItems();
          }}
        />
      )}
    </div>
  );
}
