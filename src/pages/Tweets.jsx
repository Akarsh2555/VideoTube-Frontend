import React, { useEffect, useState } from "react";
import {
  createTweet,
  updateTweet,
  deleteTweet,
  getUserTweets,
} from "../api/tweets";
import { toggleTweetLike } from "../api/likes";
import {
  Heart,
  Edit3,
  Trash2,
  Send,
  X,
  Check,
} from "lucide-react";

const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedTweets, setLikedTweets] = useState(new Set());

  const fetchTweets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getUserTweets();
      const tweetsData = res?.data?.data || [];
      if (Array.isArray(tweetsData)) {
        setTweets(tweetsData);
      } else {
        setTweets([]);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      setError("Failed to fetch tweets");
      setTweets([]);
      console.error("Error fetching tweets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handlePost = async () => {
    if (!newTweet.trim()) return;
    try {
      setLoading(true);
      await createTweet(newTweet.trim());
      setNewTweet("");
      await fetchTweets();
    } catch (err) {
      setError("Failed to create tweet");
      console.error("Error creating tweet:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    if (!editContent.trim()) return;
    try {
      setLoading(true);
      await updateTweet(id, editContent.trim());
      setEditingId(null);
      setEditContent("");
      await fetchTweets();
    } catch (err) {
      setError("Failed to update tweet");
      console.error("Error updating tweet:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tweet?")) return;
    try {
      setLoading(true);
      await deleteTweet(id);
      await fetchTweets();
    } catch (err) {
      setError("Failed to delete tweet");
      console.error("Error deleting tweet:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      await toggleTweetLike(tweetId);
      setLikedTweets((prev) => {
        const newLiked = new Set(prev);
        if (newLiked.has(tweetId)) {
          newLiked.delete(tweetId);
        } else {
          newLiked.add(tweetId);
        }
        return newLiked;
      });
    } catch (err) {
      setError("Failed to toggle like");
      console.error("Error toggling like:", err);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const safeTweets = Array.isArray(tweets) ? tweets : [];

  return (
    <div className="min-h-screen bg-black text-white font-inter p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            My Tweets
          </h1>
          <p className="text-gray-400 mt-1">Share your thoughts with the world</p>
        </header>

        {/* Tweet Composer */}
        <section className="mb-8 bg-gray-900 rounded-3xl p-6 shadow-lg border border-purple-600/40">
          <textarea
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="What's happening?"
            rows={3}
            maxLength={280}
            className="w-full p-4 rounded-xl resize-none bg-gray-800 border border-purple-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-colors text-white placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-3">
            <div className={`text-sm font-semibold ${newTweet.length > 240 ? 'text-red-500' : 'text-gray-400'}`}>
              {newTweet.length}/280
            </div>
            <button
              onClick={handlePost}
              disabled={!newTweet.trim() || loading}
              className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span>{loading ? "Posting..." : "Tweet"}</span>
            </button>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-800/20 border border-red-600 text-red-400 rounded-xl p-3 mb-6 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && safeTweets.length === 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-pink-600"></div>
          </div>
        )}

        {/* Tweets List */}
        <section className="space-y-6">
          {safeTweets.length === 0 && !loading ? (
            <div className="text-center text-gray-400 bg-gray-900 p-12 rounded-3xl border border-purple-700/30">
              <div className="text-7xl mb-5">🐦</div>
              <p className="text-xl">No tweets yet. Share your first thought!</p>
            </div>
          ) : (
            safeTweets.map((tweet) => (
              <article
                key={tweet._id || tweet.id}
                className="bg-gray-900 rounded-3xl shadow-md border border-purple-600/40 hover:bg-gray-800 hover:shadow-lg transition"
              >
                <div className="p-5">
                  {editingId === tweet._id ? (
                    <>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        maxLength={280}
                        className="w-full p-3 rounded-xl resize-none bg-gray-800 border border-purple-600 focus:ring-2 focus:ring-pink-500 transition duration-200 text-white"
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className={`text-sm font-semibold ${editContent.length > 240 ? 'text-red-500' : 'text-gray-400'}`}>
                          {editContent.length}/280
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(tweet._id)}
                            disabled={!editContent.trim() || loading}
                            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold shadow disabled:opacity-50 transition"
                          >
                            <Check size={16} />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setEditContent(""); }}
                            className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-gray-200 font-semibold transition"
                          >
                            <X size={16} />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-white whitespace-pre-wrap mb-5 text-lg">{tweet.content || "No content"}</p>
                      <div className="flex justify-between items-center text-gray-400 text-sm">
                        <time>{formatDate(tweet.createdAt)}</time>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => { setEditingId(tweet._id); setEditContent(tweet.content || ""); }}
                            className="flex items-center space-x-1 text-pink-400 hover:text-pink-500 transition"
                          >
                            <Edit3 size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(tweet._id)}
                            disabled={loading}
                            className="flex items-center space-x-1 text-red-500 hover:text-red-600 disabled:opacity-50 transition"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {editingId !== tweet._id && (
                  <footer className="border-t border-purple-700/50 bg-gray-800 rounded-b-3xl px-5 py-3 flex items-center space-x-8">
                    <button
                      onClick={() => handleLike(tweet._id)}
                      className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${
                        likedTweets.has(tweet._id) ? "text-pink-500 hover:text-pink-600" : "text-pink-400"
                      }`}
                      aria-pressed={likedTweets.has(tweet._id)}
                      aria-label="Toggle like"
                    >
                      <Heart
                        size={18}
                        fill={likedTweets.has(tweet._id) ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                      <span>{likedTweets.has(tweet._id) ? "Liked" : "Like"}</span>
                    </button>
                  </footer>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default MyTweets;
