import { useEffect, useState } from "react";
import { getUserVideos } from "../../api/video";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await getUserVideos();
      setVideos(res.data.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Your Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            {video.title || "Untitled Video"} | Uploaded at: {new Date(video.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllVideos;
