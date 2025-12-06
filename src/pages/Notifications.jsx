const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-instagram-pink rounded-full"></div>
          <div>
            <p className="font-medium"><span className="font-semibold">johndoe</span> liked your post</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-instagram-blue rounded-full"></div>
          <div>
            <p className="font-medium"><span className="font-semibold">janesmith</span> started following you</p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications