import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreVertical,
  Smile,
  BookmarkCheck,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Post = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isSaved, setIsSaved] = useState(post.isSaved)
  const [likes, setLikes] = useState(post.likes)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [commentText, setCommentText] = useState('')
  const commentInputRef = useRef(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
    if (!showComments) {
      setTimeout(() => {
        commentInputRef.current?.focus()
      }, 100)
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    
    console.log('Posting comment:', commentText)
    setCommentText('')
  }

  const nextImage = () => {
    if (currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="instagram-card max-w-2xl mx-auto mb-8 overflow-hidden"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-0.5 rounded-full ${post.user.hasUnseenStory ? 'story-ring' : 'border border-gray-300'}`}>
            <div className="bg-white p-0.5 rounded-full">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Link
                to={`/profile/${post.user.username}`}
                className="font-semibold text-sm hover:opacity-70"
              >
                {post.user.username}
              </Link>
              {post.user.isVerified && (
                <span className="text-instagram-blue" title="Verified">
                  ✓
                </span>
              )}
            </div>
            {post.location && (
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3 mr-1" />
                {post.location}
              </div>
            )}
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          
          <AnimatePresence>
            {showMoreOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Report
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Unfollow
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Copy Link
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Share to...
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative aspect-square bg-black">
        <img
          src={post.images[currentImageIndex]}
          alt={`Post by ${post.user.username}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {post.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              disabled={currentImageIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white ${
                currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-70'
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              disabled={currentImageIndex === post.images.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white ${
                currentImageIndex === post.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-70'
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-instagram-blue scale-125' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`p-1 ${isLiked ? 'text-red-500' : 'text-gray-700'} hover:text-red-500 transition-colors`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCommentClick}
              className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Comment"
            >
              <MessageCircle className="w-7 h-7" />
            </button>
            <button 
              className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Share"
            >
              <Send className="w-7 h-7" />
            </button>
          </div>
          <button
            onClick={handleSave}
            className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label={isSaved ? "Unsave post" : "Save post"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-7 h-7 text-black" />
            ) : (
              <Bookmark className="w-7 h-7" />
            )}
          </button>
        </div>

        <p className="font-semibold mb-2">
          {likes.toLocaleString()} likes
        </p>

        <div className="mb-3">
          <Link
            to={`/profile/${post.user.username}`}
            className="font-semibold mr-2 hover:opacity-70"
          >
            {post.user.username}
          </Link>
          <span className="text-gray-800">{post.caption}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/explore/tags/${tag}`}
                  className="text-instagram-blue text-sm hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {post.comments > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-gray-500 text-sm mb-3 hover:text-gray-700 transition-colors"
          >
            View all {post.comments} comments
          </button>
        )}

        <p className="text-xs text-gray-500 uppercase mb-4">
          {formatTime(post.createdAt)}
        </p>

        <form onSubmit={handleCommentSubmit} className="flex items-center pt-3 border-t">
          <button 
            type="button" 
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Emoji picker"
          >
            <Smile className="w-6 h-6" />
          </button>
          <input
            ref={commentInputRef}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none focus:ring-0 text-sm px-2 py-2 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`text-sm font-semibold px-4 py-2 ${
              commentText.trim() 
                ? 'text-instagram-blue hover:text-blue-600' 
                : 'text-blue-300 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </form>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-instagram-pink to-instagram-purple rounded-full" />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">username</span>
                        <span className="text-xs text-gray-500">2d</span>
                      </div>
                      <p className="text-sm mt-1">Great photo! 😍</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default Post