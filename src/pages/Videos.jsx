import { useEffect, useState, useRef } from "react";
import {
  getUserVideos,
  uploadVideo,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../api/videos";
import { useAuth } from "../context/AuthContext";
import React from "react";

const initialForm = {
  title: "",
  description: "",
  isPublished: false,
  thumbnail: null,
  videoFile: null,
};

// VideoFormModal component with glassy backdrop & inputs styled
const VideoFormModal = ({ show, onClose, onSubmit, loading, editingVideo }) => {
  const [form, setForm] = useState(initialForm);
  const fileRef = useRef();
  const thumbRef = useRef();

  React.useEffect(() => {
    if (editingVideo) {
      setForm({
        title: editingVideo.title || "",
        description: editingVideo.description || "",
        isPublished: editingVideo.isPublished || false,
        thumbnail: null,
        videoFile: null,
      });
    } else {
      setForm(initialForm);
    }
  }, [editingVideo, show]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      (!editingVideo && !form.videoFile) ||
      !form.thumbnail
    ) {
      alert("Please fill all fields and upload files!");
      return;
    }
    onSubmit(form);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-2xl w-full max-w-md space-y-6 border border-purple-700 text-white"
      >
        <h2 className="text-2xl font-extrabold">
          {editingVideo ? "Edit Video" : "Upload New Video"}
        </h2>
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-purple-600 bg-black bg-opacity-30 focus:border-pink-500 focus:ring focus:ring-pink-600/50 transition text-white placeholder-purple-400"
            placeholder="Enter video title"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border border-purple-600 bg-black bg-opacity-30 focus:border-pink-500 focus:ring focus:ring-pink-600/50 transition text-white placeholder-purple-400 resize-none"
            placeholder="Write video description"
            rows={4}
            required
          />
        </div>
        {!editingVideo && (
          <div>
            <label className="block font-semibold mb-1">Video File</label>
            <input
              ref={fileRef}
              name="videoFile"
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="text-white"
              required
            />
          </div>
        )}
        <div>
          <label className="block font-semibold mb-1">Thumbnail Image</label>
          <input
            ref={thumbRef}
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="text-white"
            required
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
            id="isPublished"
            className="w-5 h-5 rounded border-purple-500 focus:ring-pink-500 focus:ring-2"
          />
          <label htmlFor="isPublished" className="select-none cursor-pointer">
            Publish Now
          </label>
        </div>
        <div className="flex justify-between">
          <button
            disabled={loading}
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:brightness-110 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? editingVideo
                ? "Updating..."
                : "Uploading..."
              : editingVideo
              ? "Update Video"
              : "Upload Video"}
          </button>
          <button
            onClick={onClose}
            type="button"
            disabled={loading}
            className="text-purple-300 hover:text-pink-400 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalVideos: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const { user } = useAuth();

  const fetchVideos = async (page = 1) => {
    if (!user?._id) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await getUserVideos({ page, limit: 10, userId: user._id });
      const responseData = res.data.data;
      setVideos(responseData.videos || []);
      setPagination({
        currentPage: responseData.currentPage,
        totalPages: responseData.totalPages,
        totalVideos: responseData.totalVideos,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch videos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVideos();
    }
  }, [user]);

  const handleFormSubmit = async (form) => {
    setFormLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("isPublished", String(form.isPublished));
      if (form.videoFile) formData.append("videoFile", form.videoFile); // Only for create
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      if (editingVideo) {
        await updateVideo(editingVideo._id, formData);
      } else {
        await uploadVideo(formData);
      }
      setShowForm(false);
      setEditingVideo(null);
      fetchVideos(pagination.currentPage);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          (editingVideo
            ? "Failed to update video"
            : "Failed to upload video")
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    setLoading(true);
    try {
      await deleteVideo(videoId);
      fetchVideos(pagination.currentPage);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete video");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (videoId) => {
    setLoading(true);
    try {
      await togglePublishStatus(videoId);
      fetchVideos(pagination.currentPage);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to toggle publish status"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchVideos(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-90 p-6 font-inter text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header & Upload */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Your Videos
            </h2>
            <p className="text-violet-300 mt-1">
              {pagination.totalVideos} video
              {pagination.totalVideos !== 1 ? "s" : ""} found
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-3xl font-semibold shadow-lg hover:brightness-110 transition"
            onClick={() => {
              setShowForm(true);
              setEditingVideo(null);
            }}
          >
            + Upload Video
          </button>
        </div>

        {/* Form Modal */}
        <VideoFormModal
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingVideo(null);
          }}
          onSubmit={handleFormSubmit}
          loading={formLoading}
          editingVideo={editingVideo}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-800 bg-opacity-50 border border-red-700 text-red-300 rounded-lg p-4 mb-6 shadow-lg">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center text-violet-400 bg-gray-900 rounded-3xl p-16 border border-purple-700/30 shadow-lg">
            <p className="text-xl">No videos found.</p>
            <p className="mt-2">Upload your first video to get started!</p>
          </div>
        ) : (
          <>
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {videos.map((video) => (
            <div
      key={video._id}
      className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-lg shadow-lg overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full relative overflow-hidden rounded-t-lg h-36">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.target.src = "/placeholder-thumbnail.jpg"; }}
        />
        {video.isPublished ? (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-green-600 text-[10px] font-semibold text-white shadow z-10">
            Published
          </span>
        ) : (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-semibold text-white shadow z-10">
            Draft
          </span>
        )}
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-[9px] z-10">
          {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Video Details */}
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-white text-base font-semibold mb-1 line-clamp-2">{video.title || "Untitled Video"}</h3>
        <p className="text-gray-400 text-xs line-clamp-2 flex-grow">{video.description || "No description available"}</p>
        <div className="flex justify-between pt-1 text-gray-500 text-[11px]">
          <span>{video.views || 0} views</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
        {/* Actions */}
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            onClick={() => {
              setEditingVideo(video);
              setShowForm(true);
            }}
            className="px-2 py-0.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition text-[11px]"
          >
            Edit
          </button>
          <button
            onClick={() => handleTogglePublish(video._id)}
            className={`px-2 py-0.5 rounded-full font-semibold transition text-[11px] ${
              video.isPublished
                ? "bg-yellow-600 hover:bg-yellow-700 text-yellow-100"
                : "bg-green-600 hover:bg-green-700 text-green-100"
            }`}
          >
            {video.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => handleDelete(video._id)}
            className="px-2 py-0.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition text-[11px]"
          >
            Delete
          </button>
        </div>
      </div>
            </div>
            ))}
          </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center space-x-3 text-white">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
                >
                  Prev
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${
                      page === pagination.currentPage
                        ? "bg-pink-600"
                        : "bg-purple-800 hover:bg-purple-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Videos;
