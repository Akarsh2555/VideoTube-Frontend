import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">📺 TubeDash</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-indigo-700 p-2 rounded">Dashboard</Link>
          <Link to="/videos" className="hover:bg-indigo-700 p-2 rounded">Videos</Link>
          <Link to="/tweets" className="hover:bg-indigo-700 p-2 rounded">Tweets</Link>
          <Link to="/subscriptions" className="hover:bg-indigo-700 p-2 rounded">Subscriptions</Link>
          <Link to="/comments" className="hover:bg-indigo-700 p-2 rounded">Comments</Link>
          <Link to="/login" className="hover:bg-indigo-700 p-2 rounded mt-8 text-sm">Login</Link>
          <Link to="/register" className="hover:bg-indigo-700 p-2 rounded text-sm">Register</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TubeDash</h1>
        <p className="text-gray-600">
          This is your central dashboard for managing videos, tweets, subscriptions, and more.
          Use the sidebar to navigate through the features.
        </p>
      </main>
    </div>
  );
}
