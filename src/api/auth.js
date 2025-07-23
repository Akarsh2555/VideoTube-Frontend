import axiosInstance from "./axiosInstance";

// Register user with avatar and coverImage
export const registerUser = (formData) =>
  axiosInstance.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Login user
export const loginUser = (credentials) =>
  axiosInstance.post("/users/login", credentials);

// Logout user
export const logoutUser = () => axiosInstance.post("/users/logout");

// Get current user profile
export const getCurrentUser = () => axiosInstance.get("/users/current-user");

// Get user channel/profile info
export const getUserProfile = (userId) =>
  axiosInstance.get(`/users/c/${userId}`);

// Update user profile info (non-file fields) - FIXED to match backend route
export const updateUserProfile = (data) =>
  axiosInstance.patch(`/users/update-account`, data);

// Update avatar only - Separate function matching your route
export const updateAvatar = (formData) =>
  axiosInstance.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update cover image only - Separate function matching your route
export const updateCoverImage = (formData) =>
  axiosInstance.patch("/users/cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Change password - Matching your route
export const changePassword = (passwordData) =>
  axiosInstance.post("/users/change-password", passwordData);

// Get user channel profile by username
export const getUserChannelProfile = (username) =>
  axiosInstance.get(`/users/c/${username}`);

// Get watch history
export const getWatchHistory = () =>
  axiosInstance.get("/users/history");

// Refresh access token
export const refreshAccessToken = (refreshToken) =>
  axiosInstance.post("/users/refresh-token", { refreshToken });

// Generic function to handle avatar or cover image (keeps your existing functionality)
export const updateUserAvatarOrCover = (formData) => {
  const fieldName = [...formData.keys()][0];
  
  if (fieldName === 'avatar') {
    return updateAvatar(formData);
  } else if (fieldName === 'coverImage') {
    return updateCoverImage(formData);
  } else {
    throw new Error('Invalid field name. Use "avatar" or "coverImage"');
  }
};

// Delete user account (if you have this route)
export const deleteAccount = () => axiosInstance.delete("/users/delete-account");
