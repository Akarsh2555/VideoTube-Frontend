import axiosInstance from "../api/axiosInstance";

export const createTweet = async (content) => {
  const { data } = await axiosInstance.post("/tweets/create-tweet", { content });
  return data;
};

export const updateTweet = async (tweetId, content) => {
  const { data } = await axiosInstance.patch(`/tweets/update-tweet/${tweetId}`, {
    content,
  });
  return data;
};

export const deleteTweet = async (tweetId) => {
  const { data } = await axiosInstance.delete(`/tweets/delete-tweet/${tweetId}`);
  return data;
};

export const getUserTweets = async () => {
  const { data } = await axiosInstance.get("/tweets/user-tweets");
  return data;
};