import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import {
  User,
  AtSign,
  Mail,
  Lock,
  Upload,
  Image as ImageIcon,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Check,
  AlertCircle,
  Camera,
  Sparkles,
  Shield,
  Play,
  Video,
  Users,
  Star,
  Crown
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      for (let key in form) {
        if (form[key] && key !== 'confirmPassword') {
          data.append(key, form[key]);
        }
      }
      await registerUser(data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, [type]: file });

      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'avatar') {
          setAvatarPreview(e.target.result);
        } else {
          setCoverPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    const strengthLevels = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-red-400' },
      2: { label: 'Fair', color: 'bg-yellow-400' },
      3: { label: 'Good', color: 'bg-blue-400' },
      4: { label: 'Strong', color: 'bg-green-400' },
      5: { label: 'Very Strong', color: 'bg-green-500' }
    };

    return { strength, ...strengthLevels[strength] };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const nextStep = () => {
    if (step === 1) {
      if (!form.fullName || !form.username || !form.email || !form.password || !form.confirmPassword) {
        setError("Please fill in all required fields");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError("");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Gradients & lighting glassmorphism */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-pink-900/30" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 20% 60%, rgba(120,119,198, 0.3) 0%, transparent 50%)," +
              "radial-gradient(circle at 80% 20%, rgba(255,119,198, 0.13) 0%, transparent 50%)," +
              "radial-gradient(circle at 40% 80%, rgba(120,200,255, 0.17) 0%, transparent 50%)"
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - fun community recruiting glass/pattern */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-800 via-purple-900 to-pink-900/70 relative overflow-hidden justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute bottom-10 right-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col text-white p-14 w-full max-w-2xl">
            {/* Logo + app name */}
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/40">
                <Play className="w-9 h-9 text-white" fill="currentColor" />
              </div>
              <div>
                <span className="text-4xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
                  VideoTube
                </span>
                <p className="mt-1 text-violet-200 text-xs font-medium">Join the Revolution</p>
              </div>
            </div>
            <div className="text-center max-w-lg mb-8">
              <div className="flex justify-center mb-4">
                <Crown className="w-12 h-12 text-yellow-300 animate-pulse" />
              </div>
              <h2 className="text-5xl font-black mb-6 leading-snug">
                Become a
                <span className="block text-yellow-200 animate-pulse">Creator Today!</span>
              </h2>
              <p className="text-xl text-violet-100 leading-relaxed">
                Join millions of creators sharing their passion and building amazing communities.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-2 w-full max-w-sm mx-auto font-semibold">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-violet-500/20 to-pink-500/10 backdrop-blur-xl rounded-2xl p-4">
                <Video className="w-8 h-8 text-blue-300" />
                <div>
                  <div>Unlimited Uploads</div>
                  <div className="text-xs text-violet-100 font-normal">Share without limits</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-violet-500/20 to-blue-400/10 backdrop-blur-xl rounded-2xl p-4">
                <Users className="w-8 h-8 text-teal-300" />
                <div>
                  <div>Global Community</div>
                  <div className="text-xs text-violet-100 font-normal">Connect worldwide</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400/30 to-pink-300/10 backdrop-blur-xl rounded-2xl p-4">
                <Star className="w-8 h-8 text-yellow-300" />
                <div>
                  <div>Premium Features</div>
                  <div className="text-xs text-violet-100 font-normal">Advanced analytics</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-12 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Right - registration form, modern glass */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5
                border border-white/20 backdrop-blur-2xl shadow-2xl
                rounded-[2rem] w-full max-w-lg px-8 py-12 mx-auto relative">

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-7">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Play className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  VideoTube
                </span>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                  step >= 1 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                </div>
                <div className={`w-16 h-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                  step >= 2 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > 2 ? <Check className="w-5 h-5" /> : '2'}
                </div>
              </div>
            </div>

            {/* Glass Header */}
            <div className="text-center mb-7">
              <div className="flex items-center justify-center mb-4">
                <span className="relative inline-block">
                  <Sparkles className="w-12 h-12 text-violet-400 animate-pulse" />
                  <span className="absolute -top-2 -right-3 w-5 h-5 bg-pink-500 rounded-full animate-bounce border-2 border-white" />
                </span>
              </div>
              <h2 className="text-4xl font-black text-white mb-2">
                {step === 1 ? 'Create Account' : 'Personalize Profile'}
              </h2>
              <p className="text-lg text-violet-200">
                {step === 1 ? 'Start your creative journey today' : 'Make your profile stand out'}
              </p>
            </div>

            {/* FORM AREA */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                // Step 1: Basic Information
                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                        bg-violet-900/30 text-white placeholder:text-violet-400
                        focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                        transition-all duration-200"
                      />
                    </div>
                  </div>
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Username</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Choose a unique username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                        bg-violet-900/30 text-white placeholder:text-violet-400
                        focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                        transition-all duration-200"
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-white/10 rounded-xl font-semibold
                        bg-violet-900/30 text-white placeholder:text-violet-400
                        focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                        transition-all duration-200"
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        className="w-full pl-12 pr-12 py-4 border-2 border-white/10 rounded-xl font-semibold
                        bg-violet-900/30 text-white placeholder:text-violet-400
                        focus:bg-violet-950/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400
                        transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-200 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    {form.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-violet-300">Password Strength</span>
                          <span className={
                            passwordStrength.strength <= 2
                              ? 'text-red-400'
                              : passwordStrength.strength <= 3
                                ? 'text-yellow-400'
                                : 'text-green-400'
                          }>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-violet-950/30 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                        className={`
                          w-full pl-12 pr-12 py-4 border-2 rounded-xl font-semibold
                          bg-violet-900/30 text-white placeholder:text-violet-400
                          focus:bg-violet-950/40 transition-all duration-200
                          ${
                            form.confirmPassword && form.password !== form.confirmPassword
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
                              : form.confirmPassword && form.password === form.confirmPassword
                                ? 'border-green-400 focus:border-green-400 focus:ring-green-300'
                                : 'border-white/10 focus:border-pink-400 focus:ring-pink-400'
                          }
                        `}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-200 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Password Match Indicator */}
                    {form.confirmPassword && (
                      <div className="mt-2 flex items-center space-x-2 text-xs">
                        {form.password === form.confirmPassword ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-semibold">Passwords don't match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Step 2: Profile Images
                <div className="space-y-7">
                  {/* Avatar Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-semibold text-white mb-3">Profile Avatar</label>
                    <div className="relative inline-block mb-1.5">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 border-4 border-white shadow-xl overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-violet-400" />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'avatar')}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-violet-300 mt-1.5">Click the camera icon to upload your profile picture</p>
                  </div>
                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">Cover Image (Optional)</label>
                    <div
                      className="relative h-32 bg-gradient-to-r from-violet-100 to-pink-100 rounded-2xl border-2 border-dashed border-violet-400/50 hover:border-pink-400 transition-colors cursor-pointer overflow-hidden"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-violet-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <span className="text-sm font-semibold">Click to upload cover image</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Upload className="w-4 h-4 text-violet-600" />
                      </div>
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'coverImage')}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-violet-300 mt-1.5">Add a cover image to make your profile stand out</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-800/10 border border-pink-400 text-pink-300 px-6 py-4 rounded-2xl flex items-center space-x-3 animate-shake font-semibold">
                  <AlertCircle className="w-6 h-6 text-pink-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-5">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-6 py-4 border-2 border-white/10 text-violet-100 rounded-2xl hover:bg-white/5 font-semibold transition"
                  >
                    Back
                  </button>
                )}
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group relative flex-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 
                    hover:scale-105 hover:shadow-xl hover:from-fuchsia-500 border border-pink-400/30"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span>Continue</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity"></div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 
                      hover:scale-105 hover:shadow-xl hover:from-fuchsia-500 border border-pink-400/30 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-6 h-6" />
                          <span>Create Account</span>
                          <Star className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity"></div>
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-10 text-center">
              <p className="text-violet-200 mb-3">Already have an account?</p>
              <Link
                to="/login"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-violet-700/60 to-pink-600/50
                hover:from-pink-700/70 hover:to-yellow-400/50 text-white font-semibold px-10 py-3 rounded-2xl transition-all duration-150 border border-white/10
                shadow-lg shadow-violet-500/20 hover:scale-105"
              >
                <User className="w-5 h-5" />
                <span>Sign In Instead</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Terms Notice */}
            <div className="mt-8 bg-gradient-to-r from-violet-900/20 to-pink-900/10 border border-white/10 rounded-xl p-4 text-violet-200 text-sm flex items-start space-x-2">
              <Shield className="w-5 h-5 text-pink-400 mt-0.5" />
              <div>
                <div className="font-semibold text-white mb-1">Safe & Secure</div>
                <div>
                  By creating an account, you agree to our Terms of Service and Privacy Policy. <br />
                  Your data is protected with enterprise-grade security.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* shake animation for errors */}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-5px);}
          40% { transform: translateX(5px);}
          60% { transform: translateX(-3px);}
          80% { transform: translateX(3px);}
        }
        .animate-shake { animation: shake 0.45s; }
      `}</style>
    </div>
  );
}
