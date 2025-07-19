import axiosInstance from "../api/axiosInstance";

export const getChannelStats = async () => {
  const { data } = await axiosInstance.get("/dashboard/channel-stats");
  return data;
};

export const getChannelVideos = async (channelId) => {
  const { data } = await axiosInstance.get(
    `/dashboard/channel-videos/${channelId}`
  );
  return data;
};