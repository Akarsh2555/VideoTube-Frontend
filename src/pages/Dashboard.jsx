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
  const [localUser, setLocalUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { logout, user: authUser, updateUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, userRes] = await Promise.all([
          getChannelStats(),
          getCurrentUser()
        ]);
        
        setStats(statsRes.data.data);
        setLocalUser(userRes.data.data);
        setForm({
          fullName: userRes.data.data.fullName,
          email: userRes.data.data.email,
        });
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(localUser._id, form);
      setEditing(false);
      // Update local state
      const updatedUser = { ...localUser, ...form };
      setLocalUser(updatedUser);
      updateUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleFileUpdate = async (e) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append(e.target.name, e.target.files[0]);
      await updateUserAvatarOrCover(data);
      
      // Refresh user data
      const updated = await getCurrentUser();
      setLocalUser(updated.data.data);
      updateUser(updated.data.data);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logout();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const displayUser = localUser || authUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600">Manage your profile and view your channel statistics</p>
        </div>

        {/* User Profile Section */}
        <section className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">👤</span>
            Your Profile
          </h2>

          {displayUser ? (
            <div className="space-y-6">
              {/* Cover and Avatar Section */}
              <div className="relative">
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden">
                  {displayUser.coverImage?.url && (
                    <img
                      src={displayUser.coverImage.url}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="absolute -bottom-12 left-8">
                  <img
                    src={displayUser.avatar?.url || '/api/placeholder/100/100'}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              </div>

              <div className="pt-12">
                {/* File Upload Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <label className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-xl cursor-pointer transition-colors">
                    <span className="text-sm font-medium text-indigo-700">📷 Update Avatar</span>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleFileUpdate}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  
                  <label className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-xl cursor-pointer transition-colors">
                    <span className="text-sm font-medium text-purple-700">🖼️ Update Cover</span>
                    <input
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      onChange={handleFileUpdate}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Profile Information */}
                {editing ? (
                  <div className="space-y-4 max-w-md">
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Email"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdate}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-all font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{displayUser.fullName}</h3>
                      <p className="text-gray-600">{displayUser.email}</p>
                      <p className="text-sm text-gray-500">@{displayUser.username || 'username'}</p>
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all font-medium"
                    >
                      ✏️ Edit Profile
                    </button>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all font-medium"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          )}
        </section>

        {/* Channel Stats Section */}
        <section className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Channel Statistics
          </h2>
          
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
                <div className="text-3xl mb-2">🎥</div>
                <div className="text-3xl font-bold">{stats.totalVideos || 0}</div>
                <div className="text-blue-100">Total Videos</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
                <div className="text-3xl mb-2">👀</div>
                <div className="text-3xl font-bold">{stats.totalViews || 0}</div>
                <div className="text-purple-100">Total Views</div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-3xl font-bold">{stats.totalLikes || 0}</div>
                <div className="text-pink-100">Total Likes</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading channel stats...</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;