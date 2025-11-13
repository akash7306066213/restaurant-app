import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/Authcontext";
import LoginModal from "./components/LoginModal";
import ProfileDrawer from "./components/ProfileDrawer";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";

export default function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>   {/* <--- Router START */}

        <Routes>
          <Route 
            path="/" 
            element={<Home openLogin={() => setShowLogin(true)} openProfile={() => setShowProfile(true)} />} 
          />
          <Route 
            path="/admin" 
            element={<AdminDashboard openProfile={() => setShowProfile(true)} />} 
          />
        </Routes>

        {/* Modals must be inside BrowserRouter */}
        {showLogin && <LoginModal close={() => setShowLogin(false)} />}
        {showProfile && <ProfileDrawer close={() => setShowProfile(false)} />}

      </BrowserRouter> {/* <--- Router END */}
    </AuthProvider>
  );
}
