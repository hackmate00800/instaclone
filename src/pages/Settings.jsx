const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Account</h2>
          <button className="text-instagram-blue hover:underline">Edit Profile</button>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Security</h2>
          <button className="text-instagram-blue hover:underline">Change Password</button>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Privacy</h2>
          <button className="text-instagram-blue hover:underline">Privacy Settings</button>
        </div>
      </div>
    </div>
  )
}

export default Settings