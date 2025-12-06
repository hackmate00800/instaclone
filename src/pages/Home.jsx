import { useState } from 'react'
import Stories from '../components/feed/Stories'
import Post from '../components/feed/Post'
import Sidebar from '../components/layout/Sidebar'

const Home = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        id: 1,
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        hasUnseenStory: true,
        isVerified: false
      },
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop'],
      caption: 'Beautiful mountains view! 🏔️ #nature #mountains',
      location: 'Swiss Alps',
      likes: 1250,
      comments: 89,
      isLiked: false,
      isSaved: false,
      createdAt: '2024-01-15T10:30:00Z',
      tags: ['nature', 'mountains', 'adventure']
    },
    {
      id: 2,
      user: {
        id: 2,
        username: 'janesmith',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        hasUnseenStory: false,
        isVerified: true
      },
      images: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop'
      ],
      caption: 'Exploring new places with friends! 🌍 #travel #friends',
      location: 'Tokyo, Japan',
      likes: 3421,
      comments: 245,
      isLiked: true,
      isSaved: true,
      createdAt: '2024-01-14T14:20:00Z',
      tags: ['travel', 'friends', 'explore']
    },
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <Stories />
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home