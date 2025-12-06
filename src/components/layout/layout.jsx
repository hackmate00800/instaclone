import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14 pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout