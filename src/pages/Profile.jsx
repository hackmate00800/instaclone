import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Bookmark, UserPlus, Settings } from 'lucide-react'

const Profile = () => {
  const { username } = useParams()
  const { user: currentUser } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)

  const user = {
    username: username || currentUser?.username || 'johndoe',
    fullName: currentUser?.fullName || 'John Doe',
    bio: currentUser?.bio || 'Travel enthusiast 🌍 | Photographer 📸',
    posts: 42,
    followers: 1250,
    following: 340,
    isCurrentUser: username === currentUser?.username,
    website: 'johndoe.com',
  }

  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop' },
    { id: 2, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop' },
    { id: 3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop' },
    { id: 4, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop' },
    { id: 5, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop' },
    { id: 6, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop' },
  ]

  const savedPosts = [
    { id: 7, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop' },
    { id: 8, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="py-8">
        <div className="flex items-start space-x-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-2xl font-light">{user.username}</h1>
              <div className="flex space-x-2">
                {user.isCurrentUser ? (
                  <>
                    <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm">
                      Edit Profile
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Settings className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-4 py-1.5 rounded-lg font-semibold text-sm ${
                        isFollowing 
                          ? 'bg-gray-100 hover:bg-gray-200' 
                          : 'bg-instagram-blue text-white hover:bg-blue-600'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm">
                      Message
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex space-x-8 mb-4">
              <div>
                <span className="font-semibold">{user.posts}</span> posts
              </div>
              <div>
                <span className="font-semibold">{user.followers.toLocaleString()}</span> followers
              </div>
              <div>
                <span className="font-semibold">{user.following}</span> following
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-gray-800">{user.bio}</p>
              <a href={`https://${user.website}`} className="text-instagram-blue hover:underline">
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="flex justify-center space-x-12">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 py-4 text-sm font-semibold border-t ${
              activeTab === 'posts' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>POSTS</span>
          </button>
          
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 py-4 text-sm font-semibold border-t ${
              activeTab === 'saved' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>SAVED</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4 py-8">
          {activeTab === 'posts' ? (
            posts.map((post) => (
              <div key={post.id} className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            savedPosts.map((post) => (
              <div key={post.id} className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt="Saved post"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile