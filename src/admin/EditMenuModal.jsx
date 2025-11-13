import { useEffect, useState } from "react";
import client from "../api/client";
import uploadToCloudinary from "../utils/cloudinaryUpload";

export default function EditMenuModal({ item, close, onSaved }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: item?.name || "",
    price: item?.price || "",
    categoryId: item?.category?.id || "",
    imageUrl: item?.imageUrl || "",
    imageFile: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await client.get("/api/admin/categories");
    setCategories(res.data);
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onFileChange = (e) => setForm({ ...form, imageFile: e.target.files[0] });

  const save = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      alert("Name, price and category are required");
      return;
    }
    setSaving(true);
    try {
      let imageUrl = form.imageUrl;
      if (form.imageFile) {
        imageUrl = await uploadToCloudinary(form.imageFile); // uses your cloud config
      }

      await client.put(`/api/admin/menu/${item.id}`, {
        name: form.name,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        imageUrl,
      });

      onSaved?.();
    } catch (e) {
      console.error(e);
      alert("Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-7">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          ✏️ Edit Menu Item
        </h2>

        <div className="flex flex-col gap-4">
          {/* preview */}
          <div className="flex items-center gap-3">
            <img
              src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.imageUrl}
              alt="preview"
              className="w-16 h-16 rounded object-cover border"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/64?text=No+Img";
              }}
            />
            <input type="file" onChange={onFileChange} />
          </div>

          <div>
            <label className="text-sm font-semibold">Item Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Price (₹)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={onChange}
              className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={close} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
