import React, { useEffect, useState } from "react";
import {
  createTweet,
  updateTweet,
  deleteTweet,
  getUserTweets
} from "../api/tweets";

const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchTweets = async () => {
    const res = await getUserTweets();
    setTweets(res.data);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handlePost = async () => {
    if (!newTweet.trim()) return;
    await createTweet(newTweet);
    setNewTweet("");
    fetchTweets();
  };

  const handleEdit = async (id) => {
    await updateTweet(id, editContent);
    setEditingId(null);
    setEditContent("");
    fetchTweets();
  };

  const handleDelete = async (id) => {
    await deleteTweet(id);
    fetchTweets();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tweets</h2>
      <div className="mb-4 flex gap-2">
        <input
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="What's on your mind?"
          className="border p-2 w-full rounded"
        />
        <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>
      <div className="space-y-3">
        {tweets.map((tweet) => (
          <div key={tweet._id} className="border p-3 rounded">
            {editingId === tweet._id ? (
              <>
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border p-1 w-full"
                />
                <button
                  onClick={() => handleEdit(tweet._id)}
                  className="bg-green-500 text-white text-sm mt-2 px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{tweet.content}</p>
                <div className="flex gap-2 text-sm mt-2">
                  <button
                    onClick={() => {
                      setEditingId(tweet._id);
                      setEditContent(tweet.content);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tweet._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTweets;
