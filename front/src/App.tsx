
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Store from './pages/Store'

function App() {
  

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>}/>
          <Route path='/store' element={<Store/>}/>
        </Route>
      </Routes>
    </>
  
  )
}

export default App
