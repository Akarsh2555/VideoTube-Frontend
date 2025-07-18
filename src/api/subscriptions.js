import axios from "../api/axiosInstance";

export const toggleSubscription = async (channelId) => {
  const { data } = await axios.post(`/subscriptions/toggle-subscription/${channelId}`);
  return data;
};

export const getSubscribedChannels = async (subscriberId) => {
  const { data } = await axios.get(`/subscriptions/${subscriberId}/subscribed-channel`);
  return data;
};

export const getChannelSubscribers = async (channelId) => {
  const { data } = await axios.get(`/subscriptions/channel/${channelId}/subscribers`);
  return data;
};
