import React, { useEffect, useState } from "react";
import { MessageCircle, Edit3, Trash2, Send, User, MoreVertical, X, Check, Loader } from "lucide-react";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);
  const [error, setError] = useState("");

  const fetchComments = async (pageNum = 1, append = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await getVideoComments(videoId, pageNum, 10);
      if (res.success) {
        const newComments = res.data.comments;
        if (append) {
          setComments(prev => [...prev, ...newComments]);
        } else {
          setComments(newComments);
        }
        setTotalPages(res.data.totalPages);
        setTotalComments(res.data.totalComments);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    setError("");
    try {
      await addComment(videoId, newComment.trim());
      setNewComment("");
      fetchComments(1); // Refresh from first page
    } catch (error) {
      console.error("Failed to add comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editedContent.trim()) return;
    
    setError("");
    try {
      await updateComment(commentId, editedContent.trim());
      setEditing(null);
      setEditedContent("");
      setShowDropdown(null);
      
      // Update the comment in the local state
      setComments(prev => prev.map(c => 
        c._id === commentId 
          ? { ...c, content: editedContent.trim() }
          : c
      ));
    } catch (error) {
      console.error("Failed to update comment:", error);
      setError("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    setError("");
    try {
      await deleteComment(commentId);
      setShowDropdown(null);
      
      // Remove the comment from local state
      setComments(prev => prev.filter(c => c._id !== commentId));
      setTotalComments(prev => prev - 1);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setError("Failed to delete comment. Please try again.");
    }
  };

  const loadMoreComments = () => {
    if (page < totalPages && !loading) {
      fetchComments(page + 1, true);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleAddComment();
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
        <div className="flex items-center gap-4 text-white">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Comments</h2>
            <p className="text-white/80 text-sm">
              {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Add Comment Section */}
        <div className="mb-8">
          <div className="relative group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts about this video..."
              className="w-full p-4 pr-14 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-gray-50 focus:bg-white placeholder-gray-400 group-hover:border-gray-300"
              rows="3"
              maxLength="1000"
              disabled={submitting}
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || submitting}
              className="absolute bottom-3 right-3 p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {submitting ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-3 text-sm">
            <span className="text-gray-500">Press Ctrl+Enter to post quickly</span>
            <span className={`font-medium ${newComment.length > 800 ? 'text-red-500' : 'text-gray-500'}`}>
              {newComment.length}/1000
            </span>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {loading && comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <div className="p-4 bg-white rounded-2xl shadow-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No comments yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                Be the first to share your thoughts about this video. Your comment could start an interesting discussion!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="group bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-200 hover:shadow-lg"
              >
                {editing === comment._id ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-4 border-2 border-indigo-300 rounded-xl resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white"
                      rows="3"
                      maxLength="1000"
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateComment(comment._id)}
                        disabled={!editedContent.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditing(null);
                          setEditedContent("");
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div>
                    {/* Comment Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {comment.owner?.avatar ? (
                            <img 
                              src={comment.owner.avatar} 
                              alt={comment.owner.username}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            comment.owner?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {comment.owner?.username || 'Anonymous User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatTimeAgo(comment.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Actions Dropdown */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDropdown(showDropdown === comment._id ? null : comment._id);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showDropdown === comment._id && (
                          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-32">
                            <button
                              onClick={() => {
                                setEditing(comment._id);
                                setEditedContent(comment.content);
                                setShowDropdown(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 flex items-center gap-2 transition-colors duration-150"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-150"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="ml-13">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {page < totalPages && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreComments}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                `Load More (${comments.length}/${totalComments})`
              )}
            </button>
          </div>
        )}

        {/* Empty state when no more comments */}
        {comments.length > 0 && page >= totalPages && totalComments > comments.length && (
          <div className="text-center mt-8 py-4">
            <p className="text-gray-500">You've reached the end of comments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;