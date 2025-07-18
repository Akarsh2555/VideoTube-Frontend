import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../api/comments";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const fetchComments = async () => {
    const res = await getVideoComments(videoId);
    setComments(res.data);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(videoId, newComment);
      setNewComment("");
      fetchComments();
    }
  };

  const handleUpdateComment = async (commentId) => {
    await updateComment(commentId, editedContent);
    setEditing(null);
    setEditedContent("");
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <div className="mb-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 w-full rounded"
        />
        <button onClick={handleAddComment} className="btn mt-2 bg-blue-500 text-white px-3 py-1 rounded">
          Post
        </button>
      </div>
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="border p-2 rounded">
            {editing === c._id ? (
              <>
                <input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="border p-1 w-full rounded"
                />
                <button
                  onClick={() => handleUpdateComment(c._id)}
                  className="btn text-sm bg-green-500 text-white mt-1 px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{c.content}</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => {
                      setEditing(c._id);
                      setEditedContent(c.content);
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="text-red-500 text-sm"
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

export default Comments;
