import React, { useEffect, useState } from "react";
import { getLikedVideos } from "../api/likes";
import { Heart, Play } from "lucide-react";

const Likes = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLikedVideos();
        setLikedVideos(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-black bg-opacity-90 font-inter text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-9 h-9 text-white" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
              Liked Videos
            </h2>
            <p className="text-violet-200 mt-1">
              All the videos you’ve shown love to!
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent" />
          </div>
        )}

        {/* Empty state */}
        {!loading && likedVideos.length === 0 && (
          <div className="text-center bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-3xl p-16 border border-purple-700/30 shadow-lg">
            <div className="flex justify-center mb-6">
              <Heart className="w-14 h-14 text-pink-400" fill="currentColor" />
            </div>
            <p className="text-2xl font-semibold text-violet-100">No liked videos yet.</p>
            <p className="mt-3 text-violet-300">Go and like some cool videos!</p>
          </div>
        )}

        {/* Videos grid */}
        {!loading && likedVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likedVideos.map((video) => (
              <div
                key={video._id}
                className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-purple-700/40 hover:shadow-2xl transition"
              >
                {/* Thumbnail */}
                <div className="aspect-video w-full relative overflow-hidden rounded-t-2xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/placeholder-thumbnail.jpg";
                    }}
                  />
                  <span className="absolute top-2 left-2 px-3 py-1 rounded-full bg-pink-700/80 text-xs font-semibold text-white shadow z-10 flex items-center gap-1">
                    <Heart className="w-4 h-4 text-white" fill="currentColor" /> Liked
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs z-10 flex items-center gap-1">
                    <Play className="w-3 h-3" /> {video.views || 0}
                  </span>
                </div>
                {/* Video meta */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                    {video.title || "Untitled Video"}
                  </h3>
                  <p className="text-purple-200 text-sm line-clamp-3 flex-grow">
                    {video.description || "No description available"}
                  </p>
                  <div className="flex justify-between pt-4 text-purple-300 text-xs">
                    <span>{video.isPublished ? "Published" : "Draft"}</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Likes;
