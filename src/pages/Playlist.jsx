import React, { useEffect, useState } from "react";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../api/playlist";
import { useAuth } from "../context/AuthContext";
import { Trash2, Edit3, Plus, X, Check } from "lucide-react";

const Playlist = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch playlists for user
  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getUserPlaylists();
      setPlaylists(res.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPlaylists();
  }, [user]);

  // Create or update playlist
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      if (editingId) {
        await updatePlaylist(editingId, form);
      } else {
        await createPlaylist(form);
      }
      setShowForm(false);
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchPlaylists();
    } catch (err) {
      setError(err?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete playlist
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this playlist?")) return;
    try {
      setLoading(true);
      await deletePlaylist(id);
      fetchPlaylists();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete playlist");
    } finally {
      setLoading(false);
    }
  };

  // Edit playlist form populate
  const startEdit = (playlist) => {
    setForm({ name: playlist.name, description: playlist.description });
    setEditingId(playlist._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-600 to-pink-400 bg-clip-text text-transparent">
          Your Playlists
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({ name: "", description: "" });
          }}
          className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-2xl font-semibold shadow hover:brightness-125 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Create Playlist</span>
        </button>
      </header>

      {/* Playlist Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-3xl p-6 w-full max-w-md text-white space-y-6 border border-purple-700 shadow-2xl"
          >
            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Playlist" : "Create New Playlist"}
            </h2>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg px-3 py-2 bg-black bg-opacity-30 border border-purple-600 focus:border-pink-500 focus:ring focus:ring-pink-600/50 transition"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg px-3 py-2 bg-black bg-opacity-30 border border-purple-600 focus:border-pink-500 focus:ring focus:ring-pink-600/50 transition resize-none"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-pink-600 to-purple-700 px-5 py-2 rounded-2xl font-semibold shadow hover:brightness-110 transition disabled:opacity-50"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Creating..."
                  : editingId
                  ? "Update"
                  : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-purple-300 hover:text-pink-400 font-semibold"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-700 bg-opacity-30 text-red-400 rounded-md p-3 mb-6 shadow">
          {error}
        </div>
      )}

      {/* Playlists grid */}
      {loading && playlists.length === 0 ? (
        <div className="flex justify-center py-20 text-purple-400 font-semibold">
          Loading playlists...
        </div>
      ) : playlists.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          You have no playlists yet. Create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {playlists.map(({ _id, name, description, totalVideos, createdAt }) => (
            <div
              key={_id}
              className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-3xl shadow-lg p-5 flex flex-col justify-between cursor-pointer hover:shadow-xl transition"
              onClick={() => {
                // e.g. navigate to playlist page or open details
              }}
              role="group"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") { /* same action */ } }}
            >
              <div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white">
                  {name}
                </h3>
                <p className="text-sm text-purple-300 mb-3 line-clamp-3">
                  {description || "No description"}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-purple-400 pt-2 border-t border-purple-700/40">
                <span>{totalVideos} videos</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-3 flex space-x-2 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(_id);
                    setForm({ name, description });
                    setShowForm(true);
                  }}
                  className="px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition"
                >
                  <Edit3 className="inline w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Are you sure you want to delete this playlist?")) {
                      deletePlaylist(_id).then(fetchPlaylists);
                    }
                  }}
                  className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition"
                >
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
