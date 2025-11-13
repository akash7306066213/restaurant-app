import { useEffect, useState } from "react";
import client from "../api/client";

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await client.get("/api/admin/categories");
    setCategories(res.data);
  };

  const addCategory = async () => {
    if (!newName.trim()) return;
    await client.post("/api/admin/categories", { name: newName });
    setNewName("");
    load();
  };

  const deleteCat = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await client.delete("/api/admin/categories/" + id);
    load();
  };

  const startEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const updateCategory = async () => {
    await client.put("/api/admin/categories/" + editId, { name: editName });
    setEditId(null);
    setEditName("");
    load();
  };

  return (
    <div className="mt-5">
      
      <div className="flex gap-3 mb-6">
        <input 
          className="border p-2 rounded w-64"
          placeholder="New Category Name"
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
        />
        <button 
          onClick={addCategory}
          className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e85e29]"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {categories.map(c => (
          <div 
            key={c.id} 
            className="border shadow p-4 rounded-xl bg-white"
          >
            
            {editId === c.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e)=>setEditName(e.target.value)}
                  className="border p-2 w-full rounded mb-3"
                />
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
                  onClick={updateCategory}
                >Save</button>
                <button
                  className="px-3 py-1 bg-gray-300 rounded"
                  onClick={()=>setEditId(null)}
                >Cancel</button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">{c.name}</h3>

                <div className="flex gap-3 mt-4">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={()=>startEdit(c.id, c.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={()=>deleteCat(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
