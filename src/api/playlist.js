import axiosInstance from "./axiosInstance";

// Create a new playlist
export const createPlaylist = (data) =>
  axiosInstance.post("/playlists/create", data);

// Get all playlists for current user
export const getUserPlaylists = () =>
  axiosInstance.get("/playlists/USerPlaylist"); // typo in route 'USerPlaylist', keep consistent

// Get playlist details by ID
export const getPlaylistById = (playlistId) =>
  axiosInstance.get(`/playlists/${playlistId}`);

// Add video to playlist
export const addVideoToPlaylist = (playlistId, videoId) =>
  axiosInstance.post(`/playlists/add_video/${playlistId}`, { videoId }); // adjust if needed

// Remove video from playlist
export const removeVideoFromPlaylist = (playlistId, videoId) =>
  axiosInstance.delete(`/playlists/remove/${playlistId}/videos/${videoId}`);

// Delete a playlist
export const deletePlaylist = (playlistId) =>
  axiosInstance.delete(`/playlists/delete/${playlistId}`);

// Update playlist details
export const updatePlaylist = (playlistId, data) =>
  axiosInstance.patch(`/playlists/update/${playlistId}`, data);
