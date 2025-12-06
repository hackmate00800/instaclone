import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const Stories = () => {
  const scrollRef = useRef(null)

  const stories = [
    {
      id: 'my-story',
      user: {
        username: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        hasUnseenStory: false,
      },
      isMyStory: true,
    },
    {
      id: 1,
      user: {
        username: 'markzuckerberg',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        hasUnseenStory: true,
      },
    },
    {
      id: 2,
      user: {
        username: 'sarah_j',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        hasUnseenStory: true,
      },
    },
    {
      id: 3,
      user: {
        username: 'alex_wander',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        hasUnseenStory: false,
      },
    },
    {
      id: 4,
      user: {
        username: 'emily_rose',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        hasUnseenStory: true,
      },
    },
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative bg-white border rounded-lg p-4 mb-6 overflow-hidden">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:scale-105 transition-transform"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:scale-105 transition-transform"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-2"
      >
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
            <div className={`${story.user.hasUnseenStory ? 'story-ring' : 'p-0.5 rounded-full border-2 border-gray-300'} ${
              story.isMyStory ? 'border-dashed border-gray-400' : ''
            }`}>
              <div className="bg-white p-0.5 rounded-full">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full overflow-hidden relative">
                  <img
                    src={story.user.avatar}
                    alt={story.user.username}
                    className="w-full h-full object-cover"
                  />
                  {story.isMyStory && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs font-medium truncate max-w-[80px]">
              {story.isMyStory ? 'Your Story' : story.user.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stories