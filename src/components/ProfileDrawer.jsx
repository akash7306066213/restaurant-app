import { FaShoppingCart, FaBox, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

export default function ProfileDrawer({ close }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* dark backdrop */}
      <div onClick={close} className="fixed inset-0 bg-black/50 z-40"></div>

      {/* drawer */}
      <aside className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <FaUser size={28} />
          <div>
            <p className="font-bold">{user?.name || "Customer"}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FaShoppingCart /> My Cart
          </button>
          <button className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FaBox /> Orders
          </button>
        </nav>

        <button
          onClick={() => { logout(); close(); }}
          className="mt-auto flex items-center gap-3 p-3 rounded bg-red-50 text-red-600 hover:bg-red-100 font-semibold"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </>
  );
}
