import axiosInstance from "../api/axiosInstance";

export const toggleSubscription = async (channelId) => {
  const { data } = await axiosInstance.post(
    `/subscriptions/toggle-subscription/${channelId}`
  );
  return data;
};

export const getSubscribedChannels = async (subscriberId) => {
  const { data } = await axiosInstance.get(
    `/subscriptions/${subscriberId}/subscribed-channel`
  );
  return data;
};

export const getChannelSubscribers = async (channelId) => {
  const { data } = await axiosInstance.get(
    `/subscriptions/channel/${channelId}/subscribers`
  );
  return data;
};