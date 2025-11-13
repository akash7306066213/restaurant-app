import { useState } from "react";
import Users from "../admin/Users";
import MenuItems from "../admin/MenuItems";
import Categories from "../admin/Categories";
import { useAuth } from "../context/Authcontext";
import AdminNavbar from "../admin/AdminNavbar";
import AddMenuModal from "../admin/AddMenuModal";

export default function AdminDashboard() {

  const { user } = useAuth();
  const [page, setPage] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div>

      {/* TOP NAV */}
      <AdminNavbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        openAddMenu={() => setShowAddMenu(true)}
      />

      <div className="flex pt-20">

        {/* LEFT SIDEBAR */}
        <div
          className={`fixed top-16 left-0 w-64 h-screen bg-[#FF6B35] text-white transition-all duration-500 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="font-bold text-2xl p-5 border-b">Admin Panel</div>

          <button 
            onClick={() => setPage("users")}
            className={`block w-full text-left px-5 py-3 font-semibold ${
              page === "users" ? "bg-white text-black" : ""
            }`}
          >
            Manage Users
          </button>

          <button 
            onClick={() => setPage("menu")}
            className={`block w-full text-left px-5 py-3 font-semibold ${
              page === "menu" ? "bg-white text-black" : ""
            }`}
          >
            Manage Menu Items
          </button>

          <button 
            onClick={() => setPage("category")}
            className={`block w-full text-left px-5 py-3 font-semibold ${
              page === "category" ? "bg-white text-black" : ""
            }`}
          >
            Manage Categories
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 pl-64 p-10">
          {page === "users" && <Users sidebarOpen={sidebarOpen} />}
          {page === "menu" && <MenuItems />}
          {page === "category" && <Categories />}
        </div>
      </div>

      {showAddMenu && <AddMenuModal close={() => setShowAddMenu(false)} />}

    </div>
  );
}
