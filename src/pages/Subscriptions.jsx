import React, { useEffect, useState } from "react";
import { getSubscribedChannels } from "../api/subscriptions";
import { useAuth } from "../context/AuthContext";

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      getSubscribedChannels(user._id).then((res) => {
        setChannels(res.data);
      });
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>
      {channels.length > 0 ? (
        <ul className="space-y-3">
          {channels.map((channel) => (
            <li key={channel._id} className="border p-3 rounded">
              <p className="font-semibold">{channel.fullName}</p>
              <p className="text-gray-500">@{channel.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven’t subscribed to any channels yet.</p>
      )}
    </div>
  );
};

export default Subscriptions;
