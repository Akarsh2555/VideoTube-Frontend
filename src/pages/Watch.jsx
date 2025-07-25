// pages/Watch.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVideoById } from '../api/videos';
import { useAuth } from '../context/AuthContext';

// Import from your existing files
import { addComment, updateComment, deleteComment, getVideoComments } from '../api/comments';
import { toggleVideoLike } from '../api/likes';
import { toggleSubscription } from '../api/subscriptions';

// Lucide React icons
import { 
  ThumbsUp, 
  Share2, 
  Bell, 
  BellRing, 
  Edit3, 
  Trash2, 
  Send,
  X,
  Save,
  Play,
  Eye,
  Calendar,
  Clock,
  Heart,
  Users,
  MessageCircle
} from 'lucide-react';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Like and subscribe state (only for video, not comments)
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // Fetch video data including user-specific states
  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await getVideoById(id);
      const videoData = response.data.data;
      
      setVideo(videoData);
      setLikeCount(videoData.likesCount || 0);
      
      // FIXED: Properly handle the user-specific states from API
      // Make sure your API returns these fields based on current user
      setIsLiked(videoData.isLikedByUser || videoData.isLiked || false);
      setIsSubscribed(videoData.isSubscribedToOwner || videoData.isSubscribed || false);
      
      setError(null);

      // Fetch comments when video is loaded
      fetchComments();
    } catch (error) {
      console.error('Error fetching video:', error);
      setError('Failed to load video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchVideo();
    // eslint-disable-next-line
  }, [id]);

  // Fetch comments (simplified without like data)
  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await getVideoComments(id);
      setComments(response.data.docs || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Video like handler (unchanged)
  const handleLike = async () => {
    if (!user) {
      alert('Please login to like videos');
      return;
    }

    // Store previous state for rollback
    const prevIsLiked = isLiked;
    const prevLikeCount = likeCount;

    try {
      // Optimistic update
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

      const response = await toggleVideoLike(id);
      
      // Update with server response if available
      if (response.data) {
        setIsLiked(response.data.isLiked !== undefined ? response.data.isLiked : !prevIsLiked);
        setLikeCount(response.data.likesCount || (prevIsLiked ? prevLikeCount - 1 : prevLikeCount + 1));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Rollback on error
      setIsLiked(prevIsLiked);
      setLikeCount(prevLikeCount);
      alert('Failed to update like. Please try again.');
    }
  };

  // Subscribe handler (unchanged)
  const handleSubscribe = async () => {
    if (!user) {
      alert('Please login to subscribe');
      return;
    }
    
    if (!video?.owner?._id) return;

    const prevIsSubscribed = isSubscribed;

    try {
      setSubscriptionLoading(true);
      // Optimistic update
      setIsSubscribed(!isSubscribed);

      const response = await toggleSubscription(video.owner._id);
      
      // Update with server response
      if (response.data) {
        setIsSubscribed(response.data.isSubscribed !== undefined ? response.data.isSubscribed : !prevIsSubscribed);
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
      // Rollback on error
      setIsSubscribed(prevIsSubscribed);
      alert('Failed to update subscription. Please try again.');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Handle add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      alert('Please login to comment');
      return;
    }

    try {
      const response = await addComment(id, newComment);
      setComments(prev => [response.data, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  // Handle edit comment
  const handleEditComment = async (commentId) => {
    if (!editContent.trim()) return;
    try {
      await updateComment(commentId, editContent);
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. Please try again.');
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
            <Play className="w-6 h-6 text-indigo-600 absolute top-5 left-5" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Not Found</h2>
          <p className="text-red-500 text-lg mb-6">
            {error || 'The video you requested could not be found.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Video Player Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative group">
            <video
              src={video.videoFile}
              controls
              className="w-full aspect-video bg-black rounded-t-2xl"
              poster={video.thumbnail}
              controlsList="nodownload"
            >
              <p className="text-center p-4">
                Your browser does not support the video tag.
              </p>
            </video>
            {/* Elegant video overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-t-2xl">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <Play className="w-6 h-6" fill="currentColor" />
                    <span className="font-medium">Now Playing</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{video.views?.toLocaleString() || 0}</span>
                    <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{likeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              {video.title}
            </h1>
            
            {/* Video Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">{video.views?.toLocaleString() || 0} views</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
                {video.duration && (
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  disabled={!user}
                  className={`group flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isLiked 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200' 
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  <ThumbsUp 
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                      isLiked ? 'fill-current' : ''
                    }`} 
                  />
                  <span>{likeCount}</span>
                </button>
                
                <button className="group flex items-center space-x-3 px-6 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-full transition-all duration-300 font-medium text-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Channel Info */}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <img 
                  src={video.owner?.avatar || '/default-avatar.png'} 
                  alt={video.owner?.fullName || 'Channel'}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  onError={(e) => {
                    e.target.src = '/default-avatar.png';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {video.owner?.fullName || 'Unknown Creator'}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <span>@{video.owner?.username || 'unknown'}</span>
                      <Users className="w-4 h-4 ml-2 mr-1" />
                      <span className="text-sm">Creator</span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleSubscribe}
                    disabled={subscriptionLoading || !user}
                    className={`group flex items-center space-x-3 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed ${
                      isSubscribed
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  >
                    {subscriptionLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : isSubscribed ? (
                      <>
                        <BellRing className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Subscribed</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          {video.description && (
            <div className="mt-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-indigo-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                Description
              </h4>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {video.description}
              </p>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4"></div>
              <MessageCircle className="w-6 h-6 mr-2 text-indigo-600" />
              Comments ({comments.length})
            </h3>
          </div>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="mb-10">
              <div className="flex space-x-4">
                <img 
                  src={user?.avatar || '/default-avatar.png'} 
                  alt={user?.fullName}
                  className="w-12 h-12 rounded-full object-cover ring-3 ring-indigo-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a thoughtful comment..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      rows="4"
                    />
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      type="button"
                      onClick={() => setNewComment('')}
                      className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-10 text-center py-8 bg-gray-50 rounded-xl">
              <p className="text-gray-600">Please login to add comments</p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-8">
            {commentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-medium">Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No comments yet</h3>
                <p className="text-gray-500">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4 p-6 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-indigo-100">
                  <img 
                    src={comment.owner?.avatar || '/default-avatar.png'} 
                    alt={comment.owner?.fullName}
                    className="w-12 h-12 rounded-full object-cover ring-3 ring-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="font-bold text-gray-900">
                        {comment.owner?.fullName || 'Unknown User'}
                      </h4>
                      <span className="text-gray-500 text-sm flex items-center bg-gray-100 px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {editingComment === comment._id ? (
                      <div className="mt-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                          rows="3"
                        />
                        <div className="flex justify-end mt-3 space-x-3">
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setEditContent('');
                            }}
                            className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-all duration-200"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-all duration-200"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed mb-4">{comment.content}</p>
                    )}

                    {/* Comment Actions - Only Edit/Delete, No Like Button */}
                    <div className="flex items-center space-x-6">
                      {comment.owner?._id === user?._id && (
                        <>
                          <button 
                            onClick={() => {
                              setEditingComment(comment._id);
                              setEditContent(comment.content);
                            }}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600 transition-all duration-200"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteComment(comment._id)}
                            className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-700 transition-all duration-200"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}