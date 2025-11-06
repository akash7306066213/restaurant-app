import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import LoginModal from "./components/LoginModal"


function App() {
   const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Home openLogin={() => setShowLogin(true)} />
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </>
  )
}

export default App
