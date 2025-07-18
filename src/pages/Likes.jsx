import React, { useEffect, useState } from "react";
import { getLikedVideos } from "../api/likes";

const Likes = () => {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getLikedVideos();
      setLikedVideos(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Liked Videos</h2>
      <ul className="space-y-2">
        {likedVideos.length > 0 ? (
          likedVideos.map((video) => (
            <li key={video._id} className="border p-3 rounded">
              <p className="font-semibold">{video.title}</p>
              <p className="text-sm text-gray-600">{video.description}</p>
            </li>
          ))
        ) : (
          <p>No liked videos yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Likes;
