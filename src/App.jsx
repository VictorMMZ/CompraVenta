// import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { Purchase } from './pages/Purchases'
import { Sales } from './pages/Sales'
import {Stock} from './pages/Stock'

function App() {


  return (
   <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sale" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
      </Route>
    </Routes>
  )
}

export default App
