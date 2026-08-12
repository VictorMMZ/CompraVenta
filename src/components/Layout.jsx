import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Sidebar } from './Sidebar'
import '../assets/css/Layout.css'
import Footer from './Footer';


export function Layout() {
  return (
        <div className="layout">
            <Navbar />
            <div className="app-body">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                      <Footer />
                </main>
            </div>
        </div>
    );
}