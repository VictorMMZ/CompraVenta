// import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Purchase } from './pages/Purchases'
import { Sales } from './pages/Sales'
import { Stock } from './pages/Stock'
import { FormPurchase } from './pages/FormPurchase'
import { FormSale } from './pages/FormSale'
import { Users } from './pages/Users'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'


function App() {


  return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
    <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sale" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/formpurchase" element={<FormPurchase />} />
        <Route path="/formsale" element={<FormSale />} />
        <Route path="/users" element={<Users />} />
    </Route>
</Route>
      
    </Routes>
  )
}

export default App
