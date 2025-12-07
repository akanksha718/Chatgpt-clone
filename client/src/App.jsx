import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ChatBox from "./components/ChatBox"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import Login from "./pages/Login"
import React from "react"
import { assets } from "./assets/assets"
import './assets/prism.css'
function App() {
  const [ismenuopen, setIsmenuopen] = React.useState(false);
  return (
    <>
  {!ismenuopen && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 cursor-pointer not-dark:invert
   " onClick={()=>setIsmenuopen(true)}/>}
      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <Sidebar ismenuopen={ismenuopen} setIsmenuopen={setIsmenuopen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
