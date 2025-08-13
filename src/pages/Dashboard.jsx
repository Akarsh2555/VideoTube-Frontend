import React, { useEffect, useState } from "react";
import { getChannelStats } from "../api/dashboard";
import {
  getCurrentUser,
  updateUserProfile,
  logoutUser,
  updateAvatar,
  updateCoverImage
} from "../api/auth";
import { useAuth } from "../context/AuthContext";
import ChangePassword from "../components/ChangePassword";
import { 
  Camera, 
  Edit3, 
  LogOut, 
  User, 
  BarChart3, 
  Video, 
  Eye, 
  Heart,
  Mail,
  AtSign,
  Upload,
  Save,
  X,
  Users,
  RefreshCw,
  Key,
  Shield,
  CheckCircle,
  Play,
  Sparkles,
  Crown,
  Star,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState("");
  const [statsError, setStatsError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { logout, user: authUser, updateUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setStatsError(null);

        const [statsRes, userRes] = await Promise.all([
          getChannelStats().catch(error => {
            console.error("Stats fetch failed:", error);
            setStatsError("Failed to load channel statistics");
            return null;
          }),
          getCurrentUser()
        ]);
        
        if (statsRes?.data) {
          console.log("Stats response:", statsRes.data);
          setStats(statsRes.data);
        }
        
        const userData = userRes.data.data;
        setLocalUser(userData);
        setForm({
          fullName: userData.fullName,
          email: userData.email,
        });
        
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const retryStats = async () => {
    try {
      setStatsError(null);
      const statsRes = await getChannelStats();
      if (statsRes?.data) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error("Stats retry failed:", error);
      setStatsError("Failed to load channel statistics");
    }
  };

  const handleUpdate = async () => {
  try {
    await updateUserProfile(form);
    setEditing(false);
    
    const updatedUserResponse = await getCurrentUser();
    const updatedUserData = updatedUserResponse.data.data;
    
    setLocalUser(updatedUserData);
    updateUser(updatedUserData);
    
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);
    
  } catch (error) {
    console.error("Profile update failed:", error);
    alert("Failed to update profile. Please try again.");
  }
};

  const handleFileUpdate = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;
    
    if (!file) return;

    setUploading(true);
    setUploadingType(fieldName);
    
    try {
      const data = new FormData();
      data.append(fieldName, file);
      
      console.log(`Uploading ${fieldName}:`, file);
      
      if (fieldName === 'avatar') {
        await updateAvatar(data);
      } else if (fieldName === 'coverImage') {
        await updateCoverImage(data);
      }
      
      const updated = await getCurrentUser();
      const newUserData = updated.data.data;
      
      console.log("Updated user data:", newUserData);
      console.log(`New ${fieldName}:`, newUserData[fieldName]);
      
      setLocalUser(newUserData);
      updateUser(newUserData);
      
    } catch (error) {
      console.error("File upload failed:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setUploading(false);
      setUploadingType("");
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

  const handlePasswordChangeSuccess = (message) => {
    setSuccessMessage(message);
    setShowChangePassword(false);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 20% 60%, rgba(120,119,198, 0.3) 0%, transparent 50%)," +
                "radial-gradient(circle at 80% 20%, rgba(255,119,198, 0.15) 0%, transparent 50%)," +
                "radial-gradient(circle at 40% 80%, rgba(120,200,255, 0.2) 0%, transparent 50%)"
            }}
          />
        </div>
        
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-400/30 border-t-pink-400 mx-auto"></div>
          <p className="mt-4 text-violet-200 font-medium text-lg">Loading your creative space...</p>
        </div>
      </div>
    );
  }

  const displayUser = localUser || authUser;

  return (
    <>
      {/* Dark Background with Same Effects as Login */}
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 20% 60%, rgba(120,119,198, 0.3) 0%, transparent 50%)," +
                "radial-gradient(circle at 80% 20%, rgba(255,119,198, 0.15) 0%, transparent 50%)," +
                "radial-gradient(circle at 40% 80%, rgba(120,200,255, 0.2) 0%, transparent 50%)"
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header with Same Style */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/40">
                  <Play className="w-9 h-9 text-white" fill="currentColor" />
                </div>
                <div>
                  <span className="text-5xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
                    Dashboard
                  </span>
                  <p className="mt-1 text-violet-200 text-sm font-medium">Creator Control Center</p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-600/10 border border-green-400 text-green-200 px-6 py-4 rounded-2xl flex items-center space-x-3 font-semibold shadow-lg backdrop-blur-xl max-w-4xl mx-auto">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* User Profile Section - Glass Style */}
            <section className="bg-gradient-to-br from-white/10 to-white/5 
                            border border-white/20 backdrop-blur-2xl shadow-2xl
                            rounded-[2rem] overflow-hidden">
              <div className="relative">
                {/* Cover Image Section */}
                <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600"></div>
                  
                  {/* Cover Image */}
                  {displayUser?.coverImage && (
                    <img
                      src={displayUser.coverImage}
                      alt="Cover Image"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Cover image failed to load");
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Upload Button */}
                  <label className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full cursor-pointer hover:bg-black/70 transition-all duration-200 flex items-center space-x-2 z-10 border border-white/20">
                    {uploading && uploadingType === 'coverImage' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {uploading && uploadingType === 'coverImage' ? 'Uploading...' : 'Update Cover'}
                    </span>
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
                
                {/* Avatar Section */}
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={displayUser?.avatar || '/default-avatar.png'}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full object-cover border-6 border-white shadow-xl ring-4 ring-pink-400/50"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                    
                    <label className="absolute bottom-2 right-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white p-2 rounded-full cursor-pointer hover:from-violet-700 hover:to-pink-700 transition-all duration-200 shadow-lg border border-white/20">
                      {uploading && uploadingType === 'avatar' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileUpdate}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-8 px-8">
                {displayUser ? (
                  <div className="space-y-8">
                    {editing ? (
                      <div className="space-y-6 max-w-md">
                        <div className="space-y-4">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-300 w-5 h-5" />
                            <input
                              className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                              bg-violet-900/30 text-white placeholder:text-violet-300
                              focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                              transition-all duration-200"
                              value={form.fullName}
                              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                              placeholder="Full Name"
                            />
                          </div>
                          
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-300 w-5 h-5" />
                            <input
                              type="email"
                              className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                              bg-violet-900/30 text-white placeholder:text-violet-300
                              focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                              transition-all duration-200"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={handleUpdate}
                            className="group relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-black
                              shadow-2xl shadow-green-500/20
                              hover:scale-105 hover:shadow-green-500/40 transition-all duration-300 border border-green-400/30"
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                          </button>
                          <button
                            onClick={() => setEditing(false)}
                            className="flex items-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all font-medium border border-white/20"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h2 className="text-4xl font-black text-white bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                            {displayUser.fullName}
                          </h2>
                          <div className="flex items-center space-x-2 text-violet-200">
                            <Mail className="w-5 h-5" />
                            <span className="text-lg">{displayUser.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-violet-300">
                            <AtSign className="w-5 h-5" />
                            <span className="text-lg">@{displayUser.username || 'username'}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => setEditing(true)}
                            className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-black
                              shadow-2xl shadow-pink-500/20
                              hover:scale-105 hover:shadow-pink-500/40 hover:from-fuchsia-500 transition-all duration-300 border border-pink-400/30"
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <Edit3 className="w-5 h-5" />
                              <span>Edit Profile</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                          </button>
                          
                          <button
                            onClick={() => setShowChangePassword(true)}
                            className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-black
                              shadow-2xl shadow-orange-500/20
                              hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300 border border-orange-400/30"
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <Key className="w-5 h-5" />
                              <span>Change Password</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                          </button>
                          
                          <button
                            onClick={handleLogout}
                            className="group relative bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-black
                              shadow-2xl shadow-red-500/20
                              hover:scale-105 hover:shadow-red-500/40 transition-all duration-300 border border-red-400/30"
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <LogOut className="w-5 h-5" />
                              <span>Logout</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400/30 border-t-pink-400 mx-auto"></div>
                    <p className="mt-4 text-violet-200">Loading profile...</p>
                  </div>
                )}
              </div>
            </section>

            {/* Channel Stats Section - Glass Style */}
            <section className="bg-gradient-to-br from-white/10 to-white/5 
                            border border-white/20 backdrop-blur-2xl shadow-2xl
                            rounded-[2rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-10 h-10 text-pink-400" />
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                      Channel Statistics
                    </h2>
                    <p className="text-violet-200 mt-1">Your creative journey in numbers</p>
                  </div>
                </div>
                {statsError && (
                  <button
                    onClick={retryStats}
                    className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-violet-700 hover:to-pink-700 transition-all border border-pink-400/30"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
              
              {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-400/30 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center justify-between">
                      <Video className="w-12 h-12 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{stats.totalVideos?.toLocaleString() || 0}</div>
                        <div className="text-blue-200 font-medium text-sm">Total Videos</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl border border-purple-400/30 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                    <div className="flex items-center justify-between">
                      <Eye className="w-12 h-12 text-purple-300 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{stats.totalViews?.toLocaleString() || 0}</div>
                        <div className="text-purple-200 font-medium text-sm">Total Views</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-xl border border-pink-400/30 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
                    <div className="flex items-center justify-between">
                      <Heart className="w-12 h-12 text-pink-300 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{stats.totalLikes?.toLocaleString() || 0}</div>
                        <div className="text-pink-200 font-medium text-sm">Total Likes</div>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-400/30 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <div className="flex items-center justify-between">
                      <Users className="w-12 h-12 text-green-300 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{stats.totalSubscribers?.toLocaleString() || 0}</div>
                        <div className="text-green-200 font-medium text-sm">Subscribers</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : statsError ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-red-500/20 border border-red-400/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">
                    <X className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Failed to Load Stats</h3>
                  <p className="text-red-300 mb-4 text-lg">{statsError}</p>
                  <button
                    onClick={retryStats}
                    className="group relative bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-3 rounded-xl font-black
                      shadow-2xl shadow-pink-500/20
                      hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 border border-pink-400/30 mx-auto"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Try Again</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
                  </button>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400/30 border-t-pink-400 mx-auto"></div>
                  <p className="mt-4 text-violet-200 font-medium text-lg">Loading channel stats...</p>
                </div>
              )}
            </section>

            {/* Bottom Security Note */}
            <div className="bg-gradient-to-r from-violet-900/30 to-pink-900/20 border border-white/10 rounded-2xl p-6 text-violet-200 text-sm flex items-center space-x-3 backdrop-blur-xl max-w-2xl mx-auto">
              <Shield className="w-6 h-6 text-pink-400" />
              <span className="text-base">Your creative space is secured with enterprise-grade protection.</span>
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword 
          onClose={() => setShowChangePassword(false)} 
          onSuccess={handlePasswordChangeSuccess} 
        />
      )}
    </>
  );
};

export default Dashboard;
