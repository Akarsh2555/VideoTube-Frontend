import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Videos";
import Tweets from "./pages/Tweets";
import Subscriptions from "./pages/Subscriptions";
import Comments from "./pages/Comments";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/tweets" element={<Tweets />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/comments" element={<Comments />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
