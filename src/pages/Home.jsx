import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col py-8 px-6 shadow-2xl">
        <div className="mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            📺 TubeDash
          </h2>
          <p className="text-indigo-200 text-sm mt-2">Your content hub</p>
        </div>
        
        <nav className="flex flex-col gap-3 mb-8">
          <Link to="/dashboard" className="group flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-all duration-200 hover:translate-x-1">
            <span className="text-xl">📊</span>
            <span className="group-hover:text-white">Dashboard</span>
          </Link>
          <Link to="/videos" className="group flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-all duration-200 hover:translate-x-1">
            <span className="text-xl">🎥</span>
            <span className="group-hover:text-white">Videos</span>
          </Link>
          <Link to="/tweets" className="group flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-all duration-200 hover:translate-x-1">
            <span className="text-xl">🐦</span>
            <span className="group-hover:text-white">Tweets</span>
          </Link>
          <Link to="/subscriptions" className="group flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-all duration-200 hover:translate-x-1">
            <span className="text-xl">👥</span>
            <span className="group-hover:text-white">Subscriptions</span>
          </Link>
        </nav>

        {user && (
          <div className="mt-auto border-t border-white/20 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.avatar?.url || '/api/placeholder/40/40'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">{user.fullName}</p>
                <p className="text-indigo-200 text-xs">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to TubeDash
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your central hub for managing videos, tweets, subscriptions, and building your online presence.
              Navigate through the features using the sidebar to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard</h3>
              <p className="text-gray-600 text-sm">View your channel statistics and manage your profile</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
              <div className="text-3xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Library</h3>
              <p className="text-gray-600 text-sm">Upload, manage, and organize all your video content</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
              <div className="text-3xl mb-4">🐦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Social Posts</h3>
              <p className="text-gray-600 text-sm">Create and manage your social media presence</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}