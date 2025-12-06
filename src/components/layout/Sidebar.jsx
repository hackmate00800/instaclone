import { Link } from 'react-router-dom'
import { Bookmark, Settings, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const suggestions = [
    { username: 'travel_dude', name: 'Travel Guy', isFollowed: false },
    { username: 'foodie_girl', name: 'Food Lover', isFollowed: true },
    { username: 'fitness_man', name: 'Fitness Guru', isFollowed: false },
    { username: 'tech_guru', name: 'Tech Expert', isFollowed: true },
    { username: 'art_lover', name: 'Art Enthusiast', isFollowed: false },
  ]

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/login'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'}
          alt={user?.username || 'User'}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <Link to={`/profile/${user?.username || 'profile'}`} className="font-semibold hover:opacity-70">
            {user?.username || 'username'}
          </Link>
          <p className="text-sm text-gray-500">{user?.fullName || 'Full Name'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-500 text-sm">Suggestions For You</h3>
          <button className="text-xs font-semibold text-gray-900 hover:text-gray-700">
            See All
          </button>
        </div>
        
        {suggestions.map((suggestion) => (
          <div key={suggestion.username} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-instagram-pink to-instagram-purple rounded-full" />
              <div>
                <Link to={`/profile/${suggestion.username}`} className="font-semibold text-sm hover:opacity-70">
                  {suggestion.username}
                </Link>
                <p className="text-xs text-gray-500">{suggestion.name}</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-instagram-blue hover:text-blue-600">
              {suggestion.isFollowed ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4">
        <Link to="/saved" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
          <Bookmark className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Saved</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar