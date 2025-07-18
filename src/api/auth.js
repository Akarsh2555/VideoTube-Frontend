import axiosInstance  from "./axiosInstance";

// Register user with avatar and coverImage
export const registerUser = (formData) =>
  axiosInstance.post("/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Login user
export const login = (credentials) =>
  axiosInstance.post("/user/login", credentials);

// Logout user
export const logoutUser = () =>
  axiosInstance.post("/user/logout");

// Get current user profile
export const getCurrentUser = () =>
  axiosInstance.get("/user/get-current-user");

// Get user channel/profile info
export const getUserProfile = (userId) =>
  axiosInstance.get(`/user/c/${userId}`);

// Update user profile info (non-file fields)
export const updateUserProfile = (userId, data) =>
  axiosInstance.patch(`/user/update-account/${userId}`, data);

// Update avatar or coverImage
export const updateUserAvatarOrCover = (formData) =>
  axiosInstance.patch("/user/update-avatar-cover", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete user account
export const deleteAccount = () =>
  axiosInstance.delete("/user/delete-account");
