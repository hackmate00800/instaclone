import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login, clearError } from '../store/slices/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch(clearError())
    
    try {
      await dispatch(login(formData)).unwrap()
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border border-gray-300 rounded-lg p-8">
          <div className="flex justify-center mb-8">
            <Instagram className="w-12 h-12 text-instagram-pink" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Email or username"
              value={formData.emailOrUsername}
              onChange={(e) => setFormData({...formData, emailOrUsername: e.target.value})}
              className="instagram-input"
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="instagram-input"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="instagram-button"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-instagram-blue hover:text-blue-600">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login