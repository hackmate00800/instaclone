import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const likePost = createAsyncThunk(
  'posts/like',
  async (postId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { postId, isLiked: true }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const savePost = createAsyncThunk(
  'posts/save',
  async (postId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { postId, isSaved: true }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    savedPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likes = post.isLiked ? post.likes + 1 : post.likes - 1
        }
      })
      .addCase(savePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId)
        if (post) {
          post.isSaved = !post.isSaved
        }
      })
  },
})

export const { clearError, addPost } = postSlice.actions
export default postSlice.reducer