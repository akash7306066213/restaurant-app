import { useEffect, useState } from "react";
import client from "../api/client";
import uploadToCloudinary from "../utils/cloudinaryUpload";

export default function AddMenuModal({ close }) {

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    imageFile: null,
  });

  // load categories for dropdown
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await client.get("/api/admin/categories");
    setCategories(res.data);
  };

  // handle input change
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle image choose
  const onFileChange = (e) => setForm({ ...form, imageFile: e.target.files[0] });

 const handleSubmit = async () => {
  if (!form.name || !form.price || !form.categoryId || !form.imageFile) {
    alert("All fields required!");
    return;
  }

  try {
    // 1) upload to cloudinary
    const imgUrl = await uploadToCloudinary(form.imageFile);

    // 2) send to backend
    await client.post("/api/admin/menu", {
      name: form.name,
      price: form.price,
      imageUrl: imgUrl,
      categoryId: form.categoryId,
    });

    alert("Menu Item Added Successfully!");
    close(); // close modal

  } catch (err) {
    console.log(err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
  <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-7 animate-[zoomIn_.3s_ease]">

    <h2 className="text-2xl font-bold text-center mb-6 text-[#FF6B35]">
      🍽 Add New Menu Item
    </h2>

    <div className="flex flex-col gap-4">

      <div>
        <label className="text-sm font-semibold">Item Name</label>
        <input
          name="name"
          placeholder="Eg: Chicken Biryani"
          value={form.name}
          onChange={onChange}
          className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-[#FF6B35] outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Price (₹)</label>
        <input
          name="price"
          type="number"
          placeholder="Eg: 180"
          value={form.price}
          onChange={onChange}
          className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-[#FF6B35] outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Category</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={onChange}
          className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-[#FF6B35] outline-none"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">Image</label>
        <input
          type="file"
          className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-[#FF6B35] outline-none"
          onChange={onFileChange}
        />
      </div>
    </div>

    <div className="flex justify-end gap-3 mt-8">
      <button
        onClick={close}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-5 py-2 rounded-lg bg-[#FF6B35] text-white hover:bg-[#e65928] font-semibold"
      >
        Save
      </button>
    </div>

  </div>
</div>

  );
}
