// components/Layout/Layout.jsx (Fixed overflow issue)
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  BarChart3,
  Video,
  MessageSquare,
  Users,
  Menu,
  X,
  Bird,
  LogOut,
  User,
  Mail,
  Sparkles,
  ChevronRight,
  Book,
  Heart
} from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { path: "/", icon: Home, label: "Home", gradient: "from-blue-500 to-cyan-500" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard", gradient: "from-purple-500 to-indigo-500" },
    { path: "/videos", icon: Video, label: "Videos", gradient: "from-red-500 to-pink-500" },
    { path: "/tweets", icon: MessageSquare, label: "Tweets", gradient: "from-green-500 to-emerald-500" },
    { path: "/subscriptions", icon: Users, label: "Subscriptions", gradient: "from-orange-500 to-yellow-500" },
    {path: "/community-tweets", icon: Bird, label: "Community-Tweets", gradient: "from-teal-500 to-cyan-500" },
    {path: "/history", icon: Book, label: "Watch History", gradient: "from-gray-500 to-slate-500" },
    {path: "/like", icon: Heart, label: "Likes", gradient: "from-pink-500 to-purple-500" }
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to get image URL
  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    
    // Handle different possible structures
    if (typeof imageData === 'string') return imageData;
    if (imageData.url) return imageData.url;
    if (imageData.secure_url) return imageData.secure_url; // Cloudinary
    return null;
  };

  const avatarUrl = getImageUrl(user?.avatar);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-6 left-6 z-[60] lg:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl shadow-2xl hover:shadow-indigo-200 transition-all duration-300 hover:brightness-110"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col shadow-2xl z-50 transition-all duration-300
          w-80 
          lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Background Pattern */}
        <div className=" inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-pink-900/90 "></div>
        <div className=" inset-0 opacity-10">
          <div className=" top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent transform -skew-y-12 origin-top-left"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full p-8 overflow-hidden">
          {/* Header */}
          <div className="mb-12 pt-8 lg:pt-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Video className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  VideoTube
                </h2>
              </div>
            </div>
            <p className="text-indigo-200/80 text-sm ml-1 flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              Your content hub
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2 mb-8 flex-1 overflow-y-auto px-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg shadow-white/10 border border-white/20"
                      : "hover:bg-white/15 text-indigo-200 hover:text-white hover:shadow-md"
                  }`}
                >
                  {/* Background gradient for active item */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 rounded-2xl`}></div>
                  )}
                  
                  {/* Hover effect gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : "bg-white/10 group-hover:bg-white/20 group-hover:shadow-sm"
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : 'text-indigo-200 group-hover:text-white'}`} />
                  </div>
                  
                  <span className={`relative z-10 font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-white/80" />
                  )}
                  
                  {/* Subtle slide effect instead of scale */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          {user && (
            <div className="mt-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={avatarUrl || '/default-avatar.png'}
                      alt="Profile"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shadow-lg"
                      onError={(e) => {
                        console.log("Avatar failed to load:", avatarUrl);
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-blue-200" />
                      <p className="font-semibold text-white truncate">{user.fullName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-indigo-300" />
                      <p className="text-indigo-200 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                    navigate("/")
                  }}
                  className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500 hover:to-pink-500 text-red-200 hover:text-white py-3 px-4 rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center space-x-2 border border-red-500/20 hover:border-red-500/50 hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-8 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 min-h-screen relative">
        {/* Content Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white/80 to-indigo-50/50"></div>
        
        <div className="relative z-10 pt-20 lg:pt-0 min-h-screen">
          {/* Top gradient bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 z-30"></div>
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;