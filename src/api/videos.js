import axiosInstance from "./axiosInstance";

export const uploadVideo = (formData) =>
  axiosInstance.post("/videos/upload", formData);

export const updateVideo = (videoId, data) =>
  axiosInstance.patch(`/videos/update/${videoId}`, data);

export const deleteVideo = (videoId) =>
  axiosInstance.delete(`/videos/delete/${videoId}`);

export const getUserVideos = () => axiosInstance.get("/videos/user-videos");

export const getVideoById = async (videoId) => {
  const { data } = await axiosInstance.get(`/videos/${videoId}`);
  return data;
};