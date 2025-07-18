import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const HealthCheck = () => {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    axios
      .get("/healthcheck")
      .then(() => setStatus("✅ Server is healthy"))
      .catch(() => setStatus("❌ Server is not responding"));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Health Check</h2>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default HealthCheck;
