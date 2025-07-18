import axios from "../api/axiosInstance";

export const createTweet = async (content) => {
  const { data } = await axios.post("/tweets/creatw-tweet", { content });
  return data;
};

export const updateTweet = async (tweetId, content) => {
  const { data } = await axios.patch(`/tweets/update-tweet/${tweetId}`, { content });
  return data;
};

export const deleteTweet = async (tweetId) => {
  const { data } = await axios.delete(`/tweets/delete-tweet/${tweetId}`);
  return data;
};

export const getUserTweets = async () => {
  const { data } = await axios.get("/tweets/user-tweets");
  return data;
};
