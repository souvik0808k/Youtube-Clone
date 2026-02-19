import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    setHistory(watchHistory);
  };

  const clearHistory = () => {
    if (confirm('Clear all watch history?')) {
      localStorage.setItem('watchHistory', '[]');
      setHistory([]);
    }
  };

  const removeFromHistory = (videoId) => {
    const filtered = history.filter(item => item.id !== videoId);
    localStorage.setItem('watchHistory', JSON.stringify(filtered));
    setHistory(filtered);
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex pt-14">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          <div className="max-w-[1800px] mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-white text-3xl font-bold">Watch History</h1>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-[#272727] text-white rounded-lg hover:bg-[#3f3f3f] transition-colors text-sm font-medium"
                >
                  Clear all history
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-white text-xl font-semibold mb-2">No watch history</h2>
                <p className="text-gray-400">Videos you watch will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-4 bg-[#272727] hover:bg-[#3f3f3f] rounded-xl p-3 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => navigate(`/watch/${video.id}`)}
                      className="relative w-48 h-28 flex-shrink-0 bg-black rounded-lg overflow-hidden cursor-pointer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs font-semibold px-1 py-0.5 rounded">
                        10:24
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        onClick={() => navigate(`/watch/${video.id}`)}
                        className="text-gray-900 text-base font-semibold mb-2 line-clamp-2 cursor-pointer hover:text-gray-700"
                      >
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">Channel Name</p>
                      <p className="text-gray-600 text-sm">Watched {formatTimeAgo(video.timestamp)}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromHistory(video.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-fit"
                    >
                      <svg className="w-5 h-5 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
