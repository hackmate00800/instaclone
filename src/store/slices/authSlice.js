import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!credentials.emailOrUsername || !credentials.password) {
        throw new Error('Please enter email/username and password')
      }
      
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      const mockUser = {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 'user_123',
          username: credentials.emailOrUsername.includes('@') 
            ? credentials.emailOrUsername.split('@')[0] 
            : credentials.emailOrUsername,
          email: credentials.emailOrUsername.includes('@') 
            ? credentials.emailOrUsername 
            : `${credentials.emailOrUsername}@example.com`,
          fullName: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          followers: 1250,
          following: 340,
          posts: 42,
          bio: 'Travel enthusiast 🌍 | Photographer 📸',
          website: 'johndoe.com',
        }
      }
      
      return mockUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error('Please fill all required fields')
      }
      
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      const mockUser = {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 'user_' + Date.now(),
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName || userData.username,
          avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
          followers: 0,
          following: 0,
          posts: 0,
          bio: '',
          website: '',
        }
      }
      
      return mockUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const getInitialState = () => {
  try {
    const storedUser = localStorage.getItem('instagram_user')
    const storedToken = localStorage.getItem('instagram_token')
    
    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    }
  } catch (error) {
    console.error('Failed to parse stored auth data:', error)
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('instagram_user')
      localStorage.removeItem('instagram_token')
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('instagram_user', JSON.stringify(state.user))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        
        localStorage.setItem('instagram_user', JSON.stringify(action.payload.user))
        localStorage.setItem('instagram_token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        
        localStorage.setItem('instagram_user', JSON.stringify(action.payload.user))
        localStorage.setItem('instagram_token', action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, updateUser } = authSlice.actions
export default authSlice.reducer