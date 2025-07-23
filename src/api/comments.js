import axiosInstance from "../api/axiosInstance";

// API functions using your axiosInstance
export const addComment = async (videoId, content) => {
  const { data } = await axiosInstance.post(`/comments/add-comment/${videoId}`, {
    content,
  });
  return data;
};

export const updateComment = async (commentId, newContent) => {
  const { data } = await axiosInstance.patch(
    `/comments/update-comment/${commentId}`,
    { newContent }  // Fixed: backend expects 'newContent', not 'content'
  );
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await axiosInstance.delete(
    `/comments/delete-comment/${commentId}`
  );
  return data;
};

export const getVideoComments = async (videoId, page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/comments/video-comments/${videoId}/comments?page=${page}&limit=${limit}`
  );
  return data;
};