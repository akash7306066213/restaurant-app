//import { useAuth } from "../context/Authcontext";
import { useState } from "react";
import Users from "../admin/Users";
import MenuItems from "../admin/MenuItems";
import Categories from "../admin/Categories";
import { useAuth } from "../context/Authcontext";
export default function AdminDashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState("users");

  if (!user || user.role !== "ROLE_ADMIN") {
    return <h1 className="mt-32 text-center text-3xl text-red-600">Access Denied</h1>;
  }

  return (
    <div className="flex mt-20">
      {/* left sidebar */}
      <div className="w-64 bg-[#FF6B35] text-white h-screen p-5 space-y-4 font-bold">
        <div className="text-2xl mb-6">Admin Panel</div>
        <button onClick={() => setPage("users")}>Manage Users</button>
        <button onClick={() => setPage("menu")}>Manage Menu Items</button>
        <button onClick={() => setPage("category")}>Manage Categories</button>
      </div>

      {/* right content */}
      <div className="flex-1 p-10">
        {page === "users" && <Users />}
        {page === "menu" && <MenuItems />}
        {page === "category" && <Categories />}
      </div>
    </div>
  );
}
