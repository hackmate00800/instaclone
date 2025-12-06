import { Link, useLocation } from 'react-router-dom'
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react'
import { useSelector } from 'react-redux'

const BottomNav = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/explore', label: 'Explore' },
    { icon: PlusSquare, path: '/create', label: 'Create' },
    { icon: Heart, path: '/notifications', label: 'Notifications' },
    { icon: User, path: `/profile/${user?.username || 'profile'}`, label: 'Profile' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`p-3 rounded-lg transition-colors ${
              location.pathname === item.path ? 'text-instagram-blue' : 'text-gray-600'
            }`}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BottomNav