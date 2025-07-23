import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  Play,
  Users,
  Video
} from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginUser(form);
      login(data.data.accessToken, data.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding Panel */}
        <div className="hidden lg:flex lg:w-1/2 items-center bg-gradient-to-br from-violet-800 via-purple-900 to-pink-900/70 relative overflow-hidden justify-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-20 left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute bottom-16 right-36 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-14 w-full">
            {/* Logo + app name */}
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/40">
                <Play className="w-9 h-9 text-white" fill="currentColor" />
              </div>
              <div>
                <span className="text-4xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
                  VideoTube
                </span>
                <p className="mt-1 text-violet-200 text-xs font-medium">Creator Platform</p>
              </div>
            </div>
            <div className="text-center max-w-md">
              <h2 className="text-5xl font-black mb-7 leading-snug">
                Welcome Back,
                <span className="block text-yellow-200 drop-shadow animate-pulse">Creator!</span>
              </h2>
              <p className="text-xl text-violet-200 mb-8 leading-relaxed">
                Sign back in and continue building your empire!
              </p>
            </div>
            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm mt-10">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-violet-500/30 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4">
                <Video className="w-8 h-8 text-yellow-300" />
                <div>
                  <div className="font-semibold">4K Video Upload</div>
                  <div className="text-xs text-violet-100">Crystal clear quality</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-violet-500/30 to-blue-400/20 backdrop-blur-xl rounded-2xl p-4">
                <Users className="w-8 h-8 text-teal-300" />
                <div>
                  <div className="font-semibold">Global Audience</div>
                  <div className="text-xs text-violet-100">Reach millions worldwide</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-12 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/20 backdrop-blur-2xl shadow-2xl
                          rounded-[2rem] w-full max-w-lg px-8 py-12 mx-auto relative">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Play className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  VideoTube
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-violet-300">Sign in to continue</p>
            </div>
            {/* Desktop header */}
            <div className="hidden lg:block text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
              </div>
              <h2 className="text-4xl font-black text-white mb-3">Sign In</h2>
              <p className="text-lg text-violet-200">Continue your creative journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-5">
                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="creator@example.com"
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                      bg-violet-900/30 text-white placeholder:text-violet-300
                      focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                      transition-all duration-200"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      required
                      className="w-full pl-12 pr-12 py-4 border-2 border-white/10 rounded-xl font-semibold
                      bg-violet-900/30 text-white placeholder:text-violet-300
                      focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                      transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-200 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* Error */}
              {error && (
                <div className="bg-red-700/10 border border-red-400 text-red-200 px-6 py-4 rounded-2xl flex items-center space-x-3 font-semibold shadow-md animate-shake">
                  <AlertCircle className="w-6 h-6 text-pink-400" />
                  <span>{error}</span>
                </div>
              )}
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-black text-lg
                  shadow-2xl shadow-pink-500/20
                  hover:scale-105 hover:shadow-pink-500/40 hover:from-fuchsia-500 disabled:opacity-40 
                  border border-pink-400/30 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6" />
                      <span>Sign In</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity"></div>
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-10 text-center">
              <p className="text-violet-200 mb-4">New to VideoTube?</p>
              <Link
                to="/register"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-violet-700/60 to-pink-600/50
                          hover:from-pink-700/70 hover:to-yellow-400/50 text-white font-semibold px-10 py-3 rounded-2xl transition-all duration-150 border border-white/10
                          shadow-lg shadow-violet-500/20 hover:scale-105"
              >
                <Shield className="w-5 h-5" />
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Security bottom note */}
            <div className="mt-10 bg-gradient-to-r from-violet-900/30 to-pink-900/20 border border-white/10 rounded-xl p-4 text-violet-200 text-xs flex items-center space-x-2">
              <Shield className="w-5 h-5 text-pink-400" />
              <span>Enterprise-grade security. Your data is always protected.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
