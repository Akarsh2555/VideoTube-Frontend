import { useEffect, useState } from "react";
import { uploadVideo, getUserVideos } from "../api/videos";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);

  const fetchVideos = async () => {
    const res = await getUserVideos();
    setVideos(res.data.data);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", file);
    await uploadVideo(formData);
    fetchVideos();
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Your Videos</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>{video.title || video._id}</li>
        ))}
      </ul>
    </div>
  );
}
