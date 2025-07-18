import axios from "../api/axiosInstance";

export const addComment = async (videoId, content) => {
  const { data } = await axios.post(`/comments/add-comment/${videoId}`, { content });
  return data;
};

export const updateComment = async (commentId, content) => {
  const { data } = await axios.patch(`/comments/update-comment/${commentId}`, { content });
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await axios.delete(`/comments/delete-comment/${commentId}`);
  return data;
};

export const getVideoComments = async (videoId) => {
  const { data } = await axios.get(`/comments/video-comments/${videoId}/comments`);
  return data;
};
