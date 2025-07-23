import axiosInstance from "./axiosInstance";

// Get user's videos with pagination and filtering (existing function)
export const getUserVideos = async (params = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    query = "", 
    sortBy = "createdAt", 
    sortType = "desc", 
    userId 
  } = params;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortType,
    userId
  });

  if (query && query.trim()) {
    queryParams.append('query', query.trim());
  }

  return axiosInstance.get(`/videos?${queryParams.toString()}`);
};

// NEW: Get all public videos (for home page feed)
export const getAllVideos = async (params = {}) => {
  const { 
    page = 1, 
    limit = 12, // More videos for home page
    query = "", 
    sortBy = "createdAt", 
    sortType = "desc"
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortType
  });

  if (query && query.trim()) {
    queryParams.append('query', query.trim());
  }

  return axiosInstance.get(`/videos?${queryParams.toString()}`);
};

// Upload a new video
export const uploadVideo = async (formData) => {
  return axiosInstance.post('/videos/uploadVideo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get video by ID
export const getVideoById = async (videoId) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }
  return axiosInstance.get(`/videos/getvideobyid/${videoId}`);
};

// Update video
export const updateVideo = async (videoId, formData) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }
  return axiosInstance.patch(`/videos/update-video/${videoId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Delete video
export const deleteVideo = async (videoId) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }
  return axiosInstance.delete(`/videos/delete-video/${videoId}`);
};

// Toggle publish status
export const togglePublishStatus = async (videoId) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }
  return axiosInstance.post(`/videos/togglepublishstatus/${videoId}`);
};

// Watch video (increment views and add to history)
export const watchVideo = async (videoId) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }
  return axiosInstance.post(`/videos/${videoId}/watch`);
};