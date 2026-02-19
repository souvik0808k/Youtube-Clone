import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

export default function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(123487);
  const [activeTab, setActiveTab] = useState('all');
  const [commentText, setCommentText] = useState('');
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  useEffect(() => {
    // Fetch recommended videos
    async function fetchRecommended() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=20&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        const formatted = data.items.map((video) => ({
          id: video.id,
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.medium.url,
          channelAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(video.snippet.channelTitle)}&background=random&size=36`,
          views: video.statistics?.viewCount || '0',
          publishedAt: video.snippet.publishedAt,
        }));
        setRecommendedVideos(formatted);
      } catch (error) {
        console.error("Error fetching recommended:", error);
      }
    }
    fetchRecommended();

    // Save to watch history
    saveToWatchHistory();
  }, [id]);

  const saveToWatchHistory = () => {
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    const videoData = {
      id,
      timestamp: new Date().toISOString(),
      title: 'Video Title', // In real app, fetch from API
      thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    };
    
    // Remove if already exists and add to front
    const filtered = history.filter(item => item.id !== id);
    filtered.unshift(videoData);
    
    // Keep only last 50 videos
    localStorage.setItem('watchHistory', JSON.stringify(filtered.slice(0, 50)));
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      if (disliked) {
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikesCount(prev => prev - 1);
      }
    }
  };

  const formatViews = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num;
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => {}} />

      <main className="pt-14 px-4 lg:px-6 py-6">
        <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-6">
          {/* Left Column: Video Player, Description, and Comments */}
          <div className="flex-1 min-w-0 max-w-[1280px] xl:max-w-none xl:flex-1">
            {/* Video Player */}
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-3">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Title */}
            <h1 className="text-gray-900 text-xl font-bold mb-2 leading-tight">
              Amazing Video Title Goes Here - YouTube Clone Project
            </h1>

            {/* Channel Info and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Channel&background=ff0000&size=40"
                  alt="Channel"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Channel Name</h3>
                  <p className="text-gray-600 text-xs">1.24M subscribers</p>
                </div>
                <button 
                  onClick={() => setSubscribed(!subscribed)}
                  className={`px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                    subscribed 
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Like/Dislike */}
                <div className="flex bg-gray-100 rounded-full overflow-hidden">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2.5 hover:bg-gray-200 transition-colors border-r border-gray-300 ${
                      liked ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-sm font-medium">{formatCount(likesCount)}</span>
                  </button>
                  <button 
                    onClick={handleDislike}
                    className={`px-4 py-2.5 hover:bg-gray-200 transition-colors ${
                      disliked ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={disliked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                </div>
                
                {/* Share */}
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">Share</span>
                </button>

                {/* Download */}
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">Save</span>
                </button>

                {/* More */}
                <button className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-100 hover:bg-gray-200 rounded-xl p-3 mb-4 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 text-gray-900 text-sm font-semibold mb-2">
                <span>1,234,567 views</span>
                <span>•</span>
                <span>Dec 15, 2024</span>
              </div>
              <p className={`text-gray-900 text-sm whitespace-pre-line ${!showFullDescription && 'line-clamp-2'}`}>
                🎥 Welcome to this amazing video! In this tutorial, we'll explore React and modern web development.
                
                📌 Key Topics Covered:
                • React Hooks and State Management
                • Modern UI Design Patterns
                • YouTube Clone Development
                • API Integration Best Practices
                
                🔗 Resources:
                GitHub: github.com/example
                Documentation: react.dev
                
                #React #WebDevelopment #YouTubeClone #Tutorial #Programming
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-gray-900 font-semibold text-sm mt-2 hover:text-gray-700"
              >
                {showFullDescription ? '...Show less' : '...more'}
              </button>
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-6">
                <h3 className="text-gray-900 text-xl font-bold">1,234 Comments</h3>
                <button className="flex items-center gap-2 text-gray-900 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span className="text-sm font-semibold">Sort by</span>
                </button>
              </div>

              {/* Add Comment */}
              <div className="flex gap-3 mb-8">
                <img
                  src="https://ui-avatars.com/api/?name=You&background=4285f4&size=40"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onFocus={() => setShowCommentButtons(true)}
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 pb-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {showCommentButtons && (
                    <div className="flex justify-end gap-2 mt-2">
                      <button 
                        onClick={() => {
                          setCommentText('');
                          setShowCommentButtons(false);
                        }}
                        className="px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        disabled={!commentText.trim()}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          commentText.trim() 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Comments */}
              {[
                { name: 'TechGuru', comment: 'This is exactly what I was looking for! Great explanation on React hooks. The way you explained useState and useEffect is crystal clear. 🔥', likes: 142, time: '2 days ago' },
                { name: 'CodeMaster', comment: 'Amazing tutorial! The UI looks fantastic. Can you make a video on the backend integration next?', likes: 89, time: '1 day ago' },
                { name: 'WebDevPro', comment: 'Your content quality keeps getting better! Love the attention to detail in the styling. Subscribed! 👍', likes: 67, time: '18 hours ago' },
                { name: 'ReactNinja', comment: 'I have been trying to build a similar project but got stuck on the video player integration. This helped a lot! Thank you!', likes: 234, time: '5 hours ago' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.name}&background=random&size=40`}
                    alt="User"
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-gray-900 text-sm font-semibold">@{item.name}</span>
                      <span className="text-gray-600 text-xs">{item.time}</span>
                    </div>
                    <p className="text-gray-900 text-sm mb-2 leading-relaxed">
                      {item.comment}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-xs font-medium">{item.likes}</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 text-xs font-semibold transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shorts Section */}
            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
                </svg>
                <h2 className="text-gray-900 text-xl font-bold">Shorts</h2>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {recommendedVideos.slice(0, 8).map((video, index) => (
                  <div
                    key={`short-${video.id}`}
                    className="flex-shrink-0 w-[180px] cursor-pointer group"
                    onClick={() => navigate(`/watch/${video.id}`)}
                  >
                    <div className="relative w-full h-[320px] bg-gray-200 rounded-xl overflow-hidden mb-2">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        {formatViews(video.views)}
                      </div>
                    </div>
                    <h3 className="text-gray-900 text-sm font-semibold line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recommended Videos - Sticky/Fixed */}
          <div className="w-full xl:w-[402px] flex-shrink-0">
            <div className="xl:sticky xl:top-20">
              {/* Tabs */}
              <div className="pb-3">
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'all' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActiveTab('related')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'related' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Related
                  </button>
                  <button 
                    onClick={() => setActiveTab('creator')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'creator' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    From Creator
                  </button>
                </div>
              </div>

              {/* Video List - Scrollable */}
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {recommendedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => navigate(`/watch/${video.id}`)}
                  className="flex gap-2 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[168px] h-[94px] flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs font-semibold px-1 py-0.5 rounded">
                      10:24
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="text-gray-900 text-sm font-semibold line-clamp-2 mb-1 group-hover:text-gray-700 leading-tight">
                      {video.title}
                    </h4>
                    <p className="text-gray-600 text-xs mb-1 hover:text-gray-900 cursor-pointer transition-colors">
                      {video.channel}
                    </p>
                    <div className="text-gray-600 text-xs flex items-center gap-1">
                      <span>{formatViews(video.views)} views</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  
                  {/* More Options */}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-fit">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
