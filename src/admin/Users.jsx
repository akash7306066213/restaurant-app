import { useEffect, useState } from "react";
import client from "../api/client";

export default function Users({ sidebarOpen }) {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await client.get("/api/admin/customers");
    setUsers(res.data);
  };
  console.log("Loaded users:", users);
  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    await client.delete(`/api/admin/customers/${id}`);
    loadUsers();
  };

  return (
  <div className={`transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0"} w-full`}>
    <h1 className="text-2xl font-bold mb-5">Manage Users</h1>

    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-200 font-bold">
          <tr>
            <td className="border p-2">ID</td>
            <td className="border p-2">Name</td>
            <td className="border p-2">Email</td>
            <td className="border p-2">Action</td>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
