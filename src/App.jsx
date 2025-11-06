import { useState } from "react";
import AuthProvider from "./context/Authcontext";
//import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";
import ProfileDrawer from "./components/ProfileDrawer";
import Home from "./Pages/Home";
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <AuthProvider>
      <Home
        openLogin={() => setShowLogin(true)}
        openProfile={() => setShowProfile(true)}
      />
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
      {showProfile && <ProfileDrawer close={() => setShowProfile(false)} />}
    </AuthProvider>
  );
}
