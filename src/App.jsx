// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout Component
import Layout from "./components/Layout/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Videos";
import Tweets from "./pages/Tweets";
import Subscriptions from "./pages/Subscriptions";
import Comments from "./pages/Comments";
import Watch from "./pages/Watch";
import CommunityTweets from "./pages/CommunityTweets";
import WatchHistory from "./pages/WatchHistory";

// Protected Route Wrapper (only for authenticated users)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Wrapper for Protected Routes
const ProtectedLayoutRoute = ({ children }) => {
  return (
    <ProtectedRoute>
      <Layout>
        {children}
      </Layout>
    </ProtectedRoute>
  );
};

// Home Route Wrapper (shows landing page for guests, home for authenticated users)
const HomeRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    // Authenticated users get the full Home with Layout
    return (
      <Layout>
        <Home />
      </Layout>
    );
  } else {
    // Non-authenticated users get the Landing Page (which is part of Home component)
    return <Home />;
  }
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Home Route - Public (shows landing page for guests, home for authenticated) */}
      <Route path="/" element={<HomeRoute />} />
      
      {/* Auth Routes (redirect to home if already authenticated) */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />
      
      {/* Protected Routes (require authentication + layout) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayoutRoute>
            <Dashboard />
          </ProtectedLayoutRoute>
        }
      />
      <Route
        path="/videos"
        element={
          <ProtectedLayoutRoute>
            <Videos />
          </ProtectedLayoutRoute>
        }
      />
      <Route
        path="/tweets"
        element={
          <ProtectedLayoutRoute>
            <Tweets />
          </ProtectedLayoutRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedLayoutRoute>
            <Subscriptions />
          </ProtectedLayoutRoute>
        }
      />
      <Route
        path="/comments/:videoId"
        element={
          <ProtectedLayoutRoute>
            <Comments />
          </ProtectedLayoutRoute>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <ProtectedLayoutRoute>
            <Watch />
          </ProtectedLayoutRoute>
        }
      />
      <Route
      path="/community-tweets"
      element={
        <ProtectedLayoutRoute>
          <CommunityTweets />
        </ProtectedLayoutRoute>
        }
      />
      <Route
      path="/history"
      element={
        <ProtectedLayoutRoute>
          <WatchHistory />
        </ProtectedLayoutRoute>
        }
      />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
