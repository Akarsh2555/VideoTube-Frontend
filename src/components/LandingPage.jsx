import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useAuth = () => ({ user: null }); 

import {
  Play,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  Star,
  Video,
  TrendingUp,
  Shield,
  Zap,
  MessageCircle,
  Share2,
  Globe,
  Award,
  CheckCircle2,
  BarChart3,
  Flame
} from 'lucide-react';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true); // Trigger initial fade-in for hero section
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Add header shadow when scrolled down
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Create & Upload",
      description: "Professional video hosting with instant global delivery and 4K streaming capabilities.",
      benefit: "Reach millions instantly"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Engage & Discuss",
      description: "Foster dynamic, Twitter-style conversations directly around your content in real-time.",
      benefit: "Build loyal communities"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics & Growth",
      description: "Access deep insights, leverage trending algorithms, and optimize for explosive growth.",
      benefit: "10x your reach"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Discovery",
      description: "Our advanced recommendation engine connects creators with their perfect, worldwide audiences.",
      benefit: "Viral potential unlocked"
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Videos Uploaded", growth: "+125%" },
    { number: "500K+", label: "Active Creators", growth: "+89%" },
    { number: "50M+", label: "Monthly Views", growth: "+200%" },
    { number: "180+", label: "Countries", growth: "+45%" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "SC",
      text: "VideoTube's hybrid approach changed everything. I get YouTube's reach with Twitter's engagement – it's phenomenal!",
      followers: "2.3M followers"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Reviewer",
      avatar: "MR",  
      text: "The analytics here are insane. I understand my audience better than ever before, driving real growth.",
      followers: "890K followers"
    },
    {
      name: "Emma Thompson",
      role: "Educator",
      avatar: "ET",
      text: "Built a community of 100K learners in 3 months. The discussion features are absolutely game-changing for engagement.",
      followers: "1.2M followers"
    }
  ];

  return (
    <div className="min-h-screen font-inter antialiased bg-black text-white overflow-hidden relative">
      {/* Animated Background - More vibrant and distinct layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-indigo-900/10"></div>
        <div 
          className="absolute inset-0 opacity-40" // Increased opacity for more presence
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.4) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.08}px)` // Slightly reduced parallax for smoother feel
          }}
        ></div>
        {/* Additional glowing circles for depth and vibrancy */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Header - Sleeker glass effect, stronger shadow on scroll */}
      <header className={`relative z-50 bg-black/70 backdrop-blur-xl border-b transition-all duration-300 ${headerScrolled ? 'border-violet-500/30 shadow-xl shadow-violet-500/10' : 'border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Play className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                {/* Pulsing glow on logo */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse-fast"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VideoTube
                </span>
                <div className="text-xs text-gray-400 -mt-1">Video × Social</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={(e) => navigate("/login")}
                className="px-6 py-2.5 text-white hover:text-violet-300 font-medium transition-all hover:scale-105"
              >
                Sign In
              </button>
              <button
                href="/register"
                onClick={(e) => navigate("/register")}
                className="group px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all transform hover:scale-105 border border-white/10"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Start Creating</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Hero Badge - Text color adjusted for visibility */}
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full border border-violet-500/30 mb-8">
              <Flame className="w-5 h-5 text-orange-400 animate-pulse-slow" />
              <span className="text-violet-200 font-medium">Join 500K+ creators going viral</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow"></div>
            </div>

            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="block text-white">Create.</span>
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse-light">
                Connect.
              </span>
              <span className="block text-white">Conquer.</span>
            </h1>
            
            <p className="text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
              The first platform that combines <span className="text-violet-300 font-semibold">YouTube's reach</span> with <span className="text-pink-300 font-semibold">Twitter's engagement</span>. 
              Your videos. Your community. Your empire.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a
                href="/launch"
                onClick={(e) => handleLinkClick(e, '/launch')}
                className="group relative flex items-center space-x-4 px-12 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-3xl font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all transform hover:scale-105 border border-white/20"
              >
                <span>Launch Your Channel</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </a>
              
              <a
                href="/demo"
                onClick={(e) => handleLinkClick(e, '/demo')}
                className="flex items-center space-x-3 px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-bold text-lg border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
              >
                <Play className="w-6 h-6" />
                <span>See It In Action</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>4K Streaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Instant Upload</span>
              </div>
            </div>
          </div>

          {/* Dynamic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-gradient-to-b from-white/5 to-white/0 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group"
              >
                <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
                <div className="text-green-400 text-sm font-semibold mt-1">{stat.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-violet-500/20 rounded-full border border-violet-500/30 mb-8">
              <Award className="w-5 h-5 text-violet-400" />
              <span className="text-violet-300 font-medium">Why Creators Choose Us</span>
            </div>
            
            <h2 className="text-6xl font-black text-white mb-6">
              Everything You Need.
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Nothing You Don't.
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Powerful creator tools meets social engagement. Built for the next generation of digital storytellers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-10 rounded-4xl transition-all duration-500 cursor-pointer border backdrop-blur-sm ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/50 shadow-2xl shadow-violet-500/25 scale-105'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`mb-8 p-4 rounded-2xl w-fit ${
                  activeFeature === index 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-white/10 text-violet-400'
                }`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-lg mb-4 leading-relaxed">{feature.description}</p>
                
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm ${
                  activeFeature === index
                    ? 'bg-white/20 text-white'
                    : 'bg-violet-500/20 text-violet-300'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{feature.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-r from-violet-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              Creators Are Already
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Winning Big
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-violet-300 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-300 font-semibold">{testimonial.followers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-[3rem] p-16 overflow-hidden shadow-2xl shadow-purple-500/40 neon-glow-purple">
            {/* Animated Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 animate-pulse-slow animation-delay-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-white/20 rounded-3xl">
                  <Star className="w-16 h-16 text-yellow-300" fill="currentColor" />
                </div>
              </div>
              
              <h2 className="text-5xl font-black text-white mb-6">
                Your Moment Is Now
              </h2>
              <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the creators who are already building empires. Your first viral moment is one upload away.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="/start-empire"
                  onClick={(e) => handleLinkClick(e, '/start-empire')}
                  className="group flex items-center space-x-4 px-12 py-5 bg-white hover:bg-gray-100 text-violet-700 rounded-3xl font-black text-xl shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105"
                >
                  <span>Start Your Empire</span>
                  <Zap className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all" />
                </a>
                
                <a
                  href="/login"
                  onClick={(e) => handleLinkClick(e, '/login')}
                  className="px-12 py-5 border-2 border-white/30 hover:border-white/60 text-white rounded-3xl font-bold text-xl hover:bg-white/10 transition-all"
                >
                  I'm Already A Creator
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center space-x-8 text-gray-300">
                <span>✓ Free forever plan</span>
                <span>✓ No hidden fees</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 border-t border-white/10 py-16 px-6 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                VideoTube
              </span>
            </div>
            <p className="text-gray-400 text-lg">
              © {new Date().getFullYear()} VideoTube. Built by creators, for creators. 
              <span className="text-red-400 mx-2">♥</span>
              Made for the next generation.
            </p>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-violet-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-violet-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-violet-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Animation & Colors */
        @keyframes pulse-light {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.95; }
        }
        .animate-pulse-light { animation: pulse-light 1.5s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        @keyframes pulse-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-fast { animation: pulse-fast 1s ease-in-out infinite; }

        .neon-glow-purple {
          box-shadow:
            0 0 20px rgba(168, 85, 247, 0.7),
            0 0 40px rgba(139, 92, 246, 0.5),
            0 0 60px rgba(236, 72, 153, 0.3);
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
