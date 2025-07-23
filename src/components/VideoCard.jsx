import { useState } from "react";
import { 
  Play, 
  MoreVertical, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2,
  ThumbsUp,
  CheckCircle,
  Heart
} from "lucide-react";

const VideoCard = ({ video, onVideoClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatViews = (views) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views?.toString() || "0";
  };

  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleOptionAction = (e, action) => {
    e.stopPropagation();
    console.log(`Action: ${action}`);
    setShowOptions(false);
  };

  return (
    <div 
      className="group cursor-pointer transition-transform duration-300 hover:scale-[1.03] bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl ring-1 ring-white/10 shadow-md hover:ring-white/20 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(video)}
      role="button"
      tabIndex={0}
      onKeyPress={e => { if(e.key === 'Enter') onVideoClick(video); }}
      aria-label={`Watch video titled ${video.title}`}
    >
      {/* Thumbnail Container */}
      <div className="relative mb-3 select-none">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {/* Thumbnail Image */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={e => { e.target.src = '/default-thumbnail.jpg'; }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-105 transform transition-transform duration-300">
              <Play className="w-6 h-6 text-gray-800" fill="currentColor" />
            </div>
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2">
              <span className="bg-black/75 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center space-x-1 select-none">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(video.duration)}</span>
              </span>
            </div>
          )}

          {/* Quality Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm select-none">
              HD
            </span>
          </div>

          {/* Options Menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative">
              <button
                onClick={handleOptionsClick}
                className="w-8 h-8 bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-haspopup="true"
                aria-expanded={showOptions}
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showOptions && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20 animate-slideDown text-gray-700 font-medium">
                  <button
                    onClick={e => handleOptionAction(e, 'save')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 rounded-md"
                  >
                    <Bookmark className="w-4 h-4 text-gray-600" />
                    <span>Save to Watch Later</span>
                  </button>
                  <button
                    onClick={e => handleOptionAction(e, 'share')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 rounded-md"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={e => handleOptionAction(e, 'like')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 rounded-md"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                    <span>Add to Liked Videos</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Live Badge */}
          {video.isLive && (
            <div className="absolute top-2 left-16">
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center space-x-1 select-none">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Video Information */}
      <div className="px-1">
        <div className="flex items-start space-x-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0 pt-1">
            <div className="relative">
              <img
                src={video.owner?.avatar || "/default-avatar.png"}
                alt={video.owner?.fullName || "Channel Avatar"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20 transition duration-300 group-hover:ring-white/40"
                loading="lazy"
                onError={e => { e.target.src = '/default-avatar.png'; }}
              />
              {/* Verified Badge */}
              {video.owner?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
              {video.title}
            </h3>

            {/* Channel Name */}
            <div className="flex items-center space-x-1 mb-1">
              <p className="text-gray-600 text-sm hover:text-blue-600 transition-colors cursor-pointer truncate max-w-full">
                {video.owner?.fullName || "Unknown Channel"}
              </p>
              {video.owner?.isVerified && (
                <CheckCircle className="w-3 h-3 text-blue-600" />
              )}
            </div>

            {/* Video Stats */}
            <div className="flex items-center space-x-2 text-xs text-gray-500 select-none">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{formatViews(video.views)}</span>
              </div>
              <span>•</span>
              <span>{formatTimeAgo(video.createdAt)}</span>
              {video.likes != null && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{formatViews(video.likes)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Bar - fades on hover */}
        <div className={`mt-3 pt-3 border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 select-none">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-semibold">
                {video.category || 'General'}
              </span>
              {video.isNew && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold border border-green-200">
                  New
                </span>
              )}
            </div>
            {/* Random read time placeholder */}
            <div>
              {Math.floor(Math.random() * 5) + 1} min read
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Clip text for multiline truncate */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export { VideoCard };
