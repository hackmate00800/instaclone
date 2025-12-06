import { Link, useNavigate } from 'react-router-dom'
import { Home, Search, Compass, Send, Heart, PlusSquare, Instagram } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, onClick: () => navigate('/explore'), label: 'Search' },
    { icon: Compass, path: '/explore', label: 'Explore' },
    { icon: Send, path: '/messages', label: 'Messages' },
    { icon: Heart, path: '/notifications', label: 'Notifications' },
    { icon: PlusSquare, onClick: () => console.log('Create post'), label: 'Create' },
  ]

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Instagram className="w-8 h-8 text-instagram-pink" />
          <span className="text-xl font-bold hidden md:inline">Instagram</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
              onFocus={() => navigate('/explore')}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                } else if (item.path) {
                  navigate(item.path)
                }
              }}
              className="p-1.5 md:p-1 hover:bg-gray-100 rounded-lg md:rounded-full transition-colors"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>
          ))}
          
          <div className="relative group">
            <Link to={`/profile/${user?.username || 'profile'}`}>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'}
                  alt={user?.username || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to={`/profile/${user?.username || 'profile'}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/saved"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Saved
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar