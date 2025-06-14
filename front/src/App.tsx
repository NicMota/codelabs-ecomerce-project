
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Store from './pages/Store'
import Success from './pages/payment/Success'
import Admin from './pages/admin/Admin'

function App() {
  

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>}/>
          <Route path='/store' element={<Store/>}/>
        </Route>
        <Route path='/payment/success' element={<Success/>}/>
        <Route path='/admin/' element={<Admin/>}/>

     
      </Routes>
    </>
  
  )
}

export default App
