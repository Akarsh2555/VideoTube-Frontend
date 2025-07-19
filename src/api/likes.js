import axiosInstance from "../api/axiosInstance";

export const toggleVideoLike = async (videoId) => {
  const { data } = await axiosInstance.post(`/likes/toggle-video-like/${videoId}`);
  return data;
};

export const toggleCommentLike = async (commentId) => {
  const { data } = await axiosInstance.post(
    `/likes/toggle-comment-like/${commentId}`
  );
  return data;
};

export const toggleTweetLike = async (tweetId) => {
  const { data } = await axiosInstance.post(`/likes/toggle-tweet-like/${tweetId}`);
  return data;
};

export const getLikedVideos = async () => {
  const { data } = await axiosInstance.get("/likes/liked-videos");
  return data;
};