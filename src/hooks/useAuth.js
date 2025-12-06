import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, register, logout, clearError, updateUser } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const handleLogin = async (credentials) => {
    try {
      dispatch(clearError())
      const result = await dispatch(login(credentials))
      if (login.fulfilled.match(result)) {
        navigate('/')
        return { success: true, data: result.payload }
      } else {
        throw new Error(result.payload || 'Login failed')
      }
    } catch (error) {
      throw error
    }
  }

  const handleRegister = async (userData) => {
    try {
      dispatch(clearError())
      const result = await dispatch(register(userData))
      if (register.fulfilled.match(result)) {
        navigate('/')
        return { success: true, data: result.payload }
      } else {
        throw new Error(result.payload || 'Registration failed')
      }
    } catch (error) {
      throw error
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleUpdateProfile = (updates) => {
    dispatch(updateUser(updates))
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError: () => dispatch(clearError()),
  }
}