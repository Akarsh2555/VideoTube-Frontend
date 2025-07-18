import axios from "../api/axiosInstance";

export const getChannelStats = async () => {
  const { data } = await axios.get("/dashboard/channel-stats");
  return data;
};

export const getChannelVideos = async (channelId) => {
  const { data } = await axios.get(`/dashboard/channel-videos/${channelId}`);
  return data;
};
