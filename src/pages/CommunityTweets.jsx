import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CommunityTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTweets = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/tweets/all-tweets", {
        params: { page: pageNum, limit: 10 },
      });
      setTweets(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
      setPage(res.data.data.currentPage);
    } catch (err) {
      setError(err.message || "Failed to fetch community tweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets(1);
  }, []);

  return (
    <main className="min-h-screen bg-black bg-opacity-90 p-6 font-inter text-white max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
        Community Tweets
      </h1>

      {loading && <p>Loading tweets...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && tweets.length === 0 && <p>No tweets to show.</p>}

      <div className="space-y-6">
        {tweets.map((tweet) => (
          <article
            key={tweet._id}
            className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-xl p-5 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-2">
              <img
                className="w-10 h-10 rounded-full"
                alt={tweet.owner.fullName}
                src={tweet.owner.avatar || "/default-avatar.png"}
                onError={(e) => { e.target.src = "/default-avatar.png"; }}
              />
              <div>
                <h3 className="font-semibold text-white">{tweet.owner.fullName}</h3>
                <time className="text-sm text-gray-300">
                  {new Date(tweet.createdAt).toLocaleString()}
                </time>
              </div>
            </div>
            <p className="text-white">{tweet.content}</p>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => fetchTweets(page - 1)}
          className="px-4 py-2 rounded-lg bg-purple-700 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white self-center">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => fetchTweets(page + 1)}
          className="px-4 py-2 rounded-lg bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default CommunityTweets;
