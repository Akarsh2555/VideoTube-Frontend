import axiosInstance from "../api/axiosInstance";

export const getChannelStats = async () => {
  const { data } = await axiosInstance.get("/dashboard/channel-stats");
  return data;
};

export const getChannelVideos = async (channelId, page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/dashboard/channel-videos/${channelId}?page=${page}&limit=${limit}`
  );
  return data;
};