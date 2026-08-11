import { Routes, Route } from 'react-router-dom'
import './App.css'

// Page frontend
import Home from './pages/Home/Home.tsx'
import Profil from './pages/Profil/Profil.tsx'
import Login from './pages/Register/Login.tsx'
import Signup from './pages/Register/Signup.tsx'
import Search from './pages/Search/Search.tsx'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path='/profil' element={<Profil />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/search' element={<Search />} />
    </Routes>
  )
}

export default App
