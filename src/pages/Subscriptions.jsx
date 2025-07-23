import React, { useEffect, useState } from "react";
import { getSubscribedChannels } from "../api/subscriptions";
import { useAuth } from "../context/AuthContext";
import { Users, UserCheck, Calendar, ChevronRight } from "lucide-react";

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?._id) {
        try {
          setLoading(true);
          const res = await getSubscribedChannels(user._id);
          setChannels(res.data);
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
          setError("Failed to load subscriptions");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubscriptions();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Subscriptions</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-indigo-600" />
                Your Subscriptions
              </h1>
              <p className="text-gray-600">
                {channels.length} channel{channels.length !== 1 ? 's' : ''} you're following
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-xl">
                <UserCheck className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Grid */}
        {channels.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <div
                key={channel._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100 hover:border-indigo-200"
              >
                <div className="p-6">
                  {/* Channel Avatar and Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={channel.avatar || '/default-avatar.png'}
                        alt={channel.fullName || 'Channel Avatar'}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:ring-indigo-100 transition-all duration-300"
                        onError={(e) => {
                          e.target.src = '/default-avatar.png';
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 truncate flex items-center">
                        @{channel.username || 'unknown'}
                      </p>
                    </div>
                  </div>

                  {/* Subscription Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-full">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Subscribed</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Subscriptions Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start exploring and subscribe to channels to see them here. Discover amazing content creators!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Channels
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
