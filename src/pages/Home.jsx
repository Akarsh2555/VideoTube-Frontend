import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllVideos, watchVideo } from "../api/videos";
import { VideoCard } from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp } from "lucide-react";
import LandingPage from "../components/LandingPage";

// Loading skeleton component with glassy styling
const VideoCardSkeleton = () => (
  <div className="bg-black bg-opacity-30 rounded-3xl overflow-hidden shadow-lg animate-pulse border border-white/10">
    <div className="aspect-video bg-gray-700/40"></div>
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <div className="w-9 h-9 bg-gray-700/40 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700/40 rounded"></div>
          <div className="h-3 bg-gray-700/40 rounded w-2/3"></div>
          <div className="h-3 bg-gray-700/40 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  // Show landing page for non-authenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Fetch videos
  const fetchVideos = async (pageNum = 1, query = "", reset = false) => {
    try {
      setLoading(pageNum === 1);
      setError(null);

      const response = await getAllVideos({
        page: pageNum,
        limit: 12,
        query: query,
        sortBy: sortBy,
        sortType: "desc",
      });

      const { videos: newVideos, totalPages, currentPage } = response.data.data;

      if (reset) {
        setVideos(newVideos);
      } else {
        setVideos((prev) => (pageNum === 1 ? newVideos : [...prev, ...newVideos]));
      }

      setHasMore(currentPage < totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load and reload on sort change
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  // Handle video click
  const handleVideoClick = async (video) => {
    try {
      await watchVideo(video._id);
      navigate(`/watch/${video._id}`);
    } catch (error) {
      // Still navigate even if watchVideo fails
      navigate(`/watch/${video._id}`);
    }
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(1, searchQuery, true);
  };

  // Load more videos for pagination
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchVideos(page + 1, searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/70 backdrop-blur-lg border-b border-white/20 py-8 px-6 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="text-gray-300">Content</span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-400">
              Explore videos from talented creators around the world and find your next favorite channel.
            </p>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-3xl bg-black/60 border border-white/20 py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                />
              </div>
            </form>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-3xl bg-black/60 border border-white/20 py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              aria-label="Sort videos"
            >
              <option value="createdAt">Latest</option>
              <option value="views">Most Viewed</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </header>

      {/* Welcome message */}
      {user && (
        <section className="max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-pink-900 rounded-3xl p-5 shadow-xl flex items-center space-x-4 border border-pink-600">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white text-lg">
                Welcome back,&nbsp;
                <span className="font-semibold">{user.fullName}</span>! 👋
              </p>
              <p className="text-pink-300 text-sm tracking-wide">Ready to discover something amazing today?</p>
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {error ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-700/20 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-3">Oops! Something went wrong</h3>
            <p className="text-red-400 text-lg mb-6">{error}</p>
            <button
              onClick={() => fetchVideos(1, searchQuery, true)}
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-3 rounded-3xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Video cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <VideoCard video={video} onVideoClick={handleVideoClick} />
                </div>
              ))}

              {/* Loading Skeletons */}
              {loading &&
                Array.from({ length: 8 }, (_, i) => (
                  <VideoCardSkeleton key={`skeleton-${i}`} />
                ))}
            </div>

            {/* Load more button */}
            {!loading && hasMore && videos.length > 0 && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 px-12 py-4 rounded-3xl text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
                >
                  Load More Videos
                </button>
              </div>
            )}

            {/* No videos message */}
            {!loading && videos.length === 0 && (
              <div className="text-center py-20">
                <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gray-700/40 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-3">
                  {searchQuery ? "No videos found" : "No videos available yet"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? "Try adjusting your search terms" : "Be the first to upload a video!"}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      fetchVideos(1, "", true);
                    }}
                    className="text-pink-400 hover:text-pink-500 font-semibold transition"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
