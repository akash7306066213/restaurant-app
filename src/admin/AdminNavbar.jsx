import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ toggleSidebar, openAddMenu }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/"); // go home
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center px-4 justify-between z-50">
      
      {/* hamburger icon */}
      <button
        onClick={toggleSidebar}
        className="text-2xl hover:text-[#FF6B35] transition-all"
      >
        ☰
      </button>

      <div className="font-bold text-xl">Admin Dashboard</div>

      <div className="flex items-center gap-4">

        {/* NEW BUTTON  */}
        <button
          onClick={openAddMenu}
          className="bg-[#FF6B35] text-white px-4 py-1 rounded font-semibold hover:bg-[#e25829]"
        >
          + Menu Item
        </button>

        <button
          onClick={doLogout}
          className="text-red-600 font-bold hover:underline"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}
