import React, { useEffect, useState } from "react";
import { getChannelStats } from "../api/dashboard";
import {
  getCurrentUser,
  updateUserAvatarOrCover,
  updateUserProfile,
  logoutUser
} from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [editing, setEditing] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getChannelStats();
        const userRes = await getCurrentUser();
        setStats(statsRes.data.data);
        setUser(userRes.data.data);
        setForm({
          fullName: userRes.data.data.fullName,
          email: userRes.data.data.email,
        });
      } catch (error) {
        console.error("Dashboard load failed:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    await updateUserProfile(user._id, form);
    setEditing(false);
  };

  const handleFileUpdate = async (e) => {
    const data = new FormData();
    data.append(e.target.name, e.target.files[0]);
    await updateUserAvatarOrCover(data);
    // refresh avatar/cover after upload
    const updated = await getCurrentUser();
    setUser(updated.data.data);
  };

  const handleLogout = async () => {
    await logoutUser();
    logout();
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* User Profile Section */}
      <section className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Your Profile</h2>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-start gap-6">
              <img
                src={user.avatar?.url}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <img
                src={user.coverImage?.url}
                alt="Cover"
                className="w-48 h-24 object-cover rounded-lg border"
              />
            </div>

            <div className="flex gap-4">
              <input
                type="file"
                name="avatar"
                onChange={handleFileUpdate}
              />
              <input
                type="file"
                name="coverImage"
                onChange={handleFileUpdate}
              />
            </div>

            {editing ? (
              <div className="space-y-2">
                <input
                  className="border px-3 py-1 rounded w-full"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
                <input
                  className="border px-3 py-1 rounded w-full"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{user.fullName}</h3>
                <p className="text-gray-600">{user.email}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-2 px-4 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-1 text-sm bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </section>

      {/* Channel Stats Section */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Channel Stats</h2>
        {stats ? (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Total Videos: {stats.totalVideos}</li>
            <li>Total Views: {stats.totalViews}</li>
            <li>Total Likes: {stats.totalLikes}</li>
          </ul>
        ) : (
          <p>Loading channel stats...</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
