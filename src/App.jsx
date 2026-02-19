import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import VideoCard from "./components/Videocard";
import WatchPage from "./components/Watchpage";
import WatchHistory from "./components/WatchHistory";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterChips from "./components/FilterChips";

function App() {
  const [videos, setVideos] = useState([]);
  const [shortsVideos, setShortsVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=24&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const data = await response.json();

        if (data.error) {
          console.error("YouTube API Error:", data.error);
          setError(data.error.message);
          setLoading(false);
          return;
        }

        if (!data.items || data.items.length === 0) {
          setError("No videos found");
          setLoading(false);
          return;
        }

        const formattedVideos = data.items.map((video) => ({
          id: video.id,
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.high.url,
          channelAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(video.snippet.channelTitle)}&background=random&size=36`,
          publishedAt: video.snippet.publishedAt,
          views: video.statistics?.viewCount || '0',
        }));

        setVideos(formattedVideos.slice(0, 12));
        setShortsVideos(formattedVideos.slice(12, 20));
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message || "Failed to fetch videos");
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const formatViews = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
  };

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} />
              
              <main className={`pt-14 ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-20'} transition-all duration-300`}>
                <div className="sticky top-14 z-20 bg-white">
                  <FilterChips />
                </div>
                
                <div className="px-4 lg:px-6 py-6">
                  {loading ? (
                    <div className="flex flex-col justify-center items-center h-96">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
                      <h2 className="text-gray-600 text-lg">Loading awesome videos...</h2>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col justify-center items-center h-96">
                      <svg className="w-16 h-16 text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h2 className="text-gray-900 text-xl font-semibold mb-2">Failed to load videos</h2>
                      <p className="text-gray-600 text-sm mb-4">{error}</p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Main Video Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-8 mb-12">
                        {videos.map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </div>

                      {/* Shorts Section */}
                      <div className="mt-8 mb-8">
                        <div className="flex items-center gap-2 mb-6">
                          <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
                          </svg>
                          <h2 className="text-gray-900 text-2xl font-bold">Shorts</h2>
                        </div>
                        
                        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                          {shortsVideos.map((video) => (
                            <div
                              key={`short-${video.id}`}
                              className="flex-shrink-0 w-[200px] cursor-pointer group"
                              onClick={() => window.location.href = `/watch/${video.id}`}
                            >
                              <div className="relative w-full h-[355px] bg-gray-200 rounded-xl overflow-hidden mb-2">
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-sm font-semibold bg-black/70 px-2 py-1 rounded">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                  {formatViews(video.views)}
                                </div>
                              </div>
                              <h3 className="text-gray-900 text-sm font-semibold line-clamp-2 leading-tight mb-1">
                                {video.title}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </main>
            </>
          }
        />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/history" element={<WatchHistory />} />
      </Routes>
    </div>
  );
}

export default App;
