import React, { useEffect, useState } from 'react';
import { getWatchHistory } from '../api/auth'; // You'll need to add this API function
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  History, 
  Play, 
  Eye, 
  Clock, 
  User,
  RefreshCw,
  Trash2,
  Calendar,
  VideoIcon,
  Sparkles,
  Crown
} from 'lucide-react';

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchWatchHistory = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getWatchHistory();
      setWatchHistory(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch watch history:', err);
      setError(err.response?.data?.message || 'Failed to load watch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWatchHistory();
    }
  }, [user]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 20% 60%, rgba(120,119,198, 0.3) 0%, transparent 50%)," +
                "radial-gradient(circle at 80% 20%, rgba(255,119,198, 0.15) 0%, transparent 50%)," +
                "radial-gradient(circle at 40% 80%, rgba(120,200,255, 0.2) 0%, transparent 50%)"
            }}
          />
        </div>
        
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-400/30 border-t-pink-400 mx-auto"></div>
          <p className="mt-4 text-violet-200 font-medium text-lg">Loading your watch history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 20% 60%, rgba(120,119,198, 0.3) 0%, transparent 50%)," +
              "radial-gradient(circle at 80% 20%, rgba(255,119,198, 0.15) 0%, transparent 50%)," +
              "radial-gradient(circle at 40% 80%, rgba(120,200,255, 0.2) 0%, transparent 50%)"
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/40">
                <History className="w-9 h-9 text-white" />
              </div>
              <div>
                <span className="text-5xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
                  Watch History
                </span>
                <p className="mt-1 text-violet-200 text-sm font-medium">Your viewing journey</p>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-yellow-400 animate-pulse mr-2" />
              <h2 className="text-2xl font-black text-white">
                Recently watched videos
              </h2>
              <Clock className="w-6 h-6 text-yellow-400 animate-pulse ml-2" />
            </div>
            <p className="text-lg text-violet-200">Revisit your favorite content anytime</p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 
                            border border-red-400/30 backdrop-blur-2xl shadow-2xl
                            rounded-[2rem] p-8 text-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-400/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">
                <RefreshCw className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Failed to Load History</h3>
              <p className="text-red-300 mb-4 text-lg">{error}</p>
              <button
                onClick={fetchWatchHistory}
                className="group relative bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-3 rounded-xl font-black
                  shadow-2xl shadow-pink-500/20
                  hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 border border-pink-400/30"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
              </button>
            </div>
          )}

          {/* Watch History Content */}
          {!error && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 
                            border border-white/20 backdrop-blur-2xl shadow-2xl
                            rounded-[2rem] p-8">
              
              {/* Stats Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <VideoIcon className="w-8 h-8 text-pink-400" />
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                      {watchHistory.length} Videos Watched
                    </h3>
                    <p className="text-violet-200 text-sm mt-1">Your personalized viewing history</p>
                  </div>
                </div>
                
                <button
                  onClick={fetchWatchHistory}
                  className="flex items-center space-x-2 bg-gradient-to-r from-violet-600/20 to-pink-600/20 backdrop-blur-xl border border-violet-400/30 text-violet-200 px-4 py-2 rounded-xl hover:from-violet-600/30 hover:to-pink-600/30 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Videos List */}
              {watchHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-r from-violet-500/20 to-pink-500/20 backdrop-blur-xl border border-violet-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <History className="w-10 h-10 text-violet-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Watch History Yet</h3>
                  <p className="text-violet-200 text-lg mb-6">Start watching videos to build your history!</p>
                  <Link
                    to="/"
                    className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-black text-lg
                      shadow-2xl shadow-pink-500/20
                      hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 border border-pink-400/30 inline-block"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <Play className="w-6 h-6" fill="currentColor" />
                      <span>Explore Videos</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {watchHistory.map((video, index) => (
                    <div
                      key={video._id || index}
                      className="group bg-gradient-to-r from-violet-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:from-violet-500/20 hover:to-pink-500/20 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-full md:w-80 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/placeholder-thumbnail.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                            {formatDuration(video.duration)}
                          </div>
                          <div className="absolute top-2 left-2 bg-violet-600/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Crown className="w-3 h-3" />
                            <span>Watched</span>
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <Link
                              to={`/video/${video._id}`}
                              className="text-white text-xl font-bold hover:text-pink-400 transition-colors line-clamp-2 group-hover:text-pink-300"
                            >
                              {video.title}
                            </Link>
                            <p className="text-violet-200 text-sm mt-1 line-clamp-2">
                              {video.description}
                            </p>
                          </div>

                          {/* Channel Info */}
                          {video.owner && (
                            <div className="flex items-center space-x-3">
                              <img
                                src={video.owner.avatar}
                                alt={video.owner.fullName}
                                className="w-8 h-8 rounded-full border-2 border-violet-400/50"
                                onError={(e) => {
                                  e.target.src = '/default-avatar.png';
                                }}
                              />
                              <div>
                                <p className="text-violet-200 font-medium text-sm">
                                  {video.owner.fullName}
                                </p>
                                <p className="text-violet-300 text-xs">
                                  @{video.owner.username}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Video Stats */}
                          <div className="flex items-center space-x-6 text-sm text-violet-300">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{video.views?.toLocaleString() || 0} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(video.createdAt)}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-3">
                            <Link
                              to={`/video/${video._id}`}
                              className="group/btn relative bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold
                                shadow-lg shadow-violet-500/20
                                hover:scale-105 hover:shadow-violet-500/40 transition-all duration-200 border border-violet-400/30 text-sm"
                            >
                              <span className="relative z-10 flex items-center space-x-2">
                                <Play className="w-4 h-4" fill="currentColor" />
                                <span>Watch Again</span>
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover/btn:opacity-40 rounded-lg blur transition-opacity"></div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Note */}
          <div className="bg-gradient-to-r from-violet-900/30 to-pink-900/20 border border-white/10 rounded-2xl p-6 text-violet-200 text-sm flex items-center space-x-3 backdrop-blur-xl max-w-2xl mx-auto">
            <History className="w-6 h-6 text-pink-400" />
            <span className="text-base">Your watch history helps us recommend better content for you.</span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;
