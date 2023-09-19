import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'

function App() {
  // effect

  return (
    <div className='text-black h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundColor": "white" }}>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
