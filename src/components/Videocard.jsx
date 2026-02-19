import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  // Format time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div
      onClick={() => navigate(`/watch/${video.id}`)}
      className="group cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-all duration-200 group-hover:rounded-xl"
          loading="lazy"
        />
        {/* Duration Badge (Static placeholder) */}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-semibold px-1 py-0.5 rounded">
          10:24
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full"
          />
        </div>

        {/* Video Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-medium text-sm leading-tight line-clamp-2 mb-1">
            {video.title}
          </h3>
          <p className="text-gray-600 text-xs mb-0.5 hover:text-gray-900 cursor-pointer transition-colors">
            {video.channel}
          </p>
          <div className="flex items-center text-gray-600 text-xs space-x-1">
            <span>1.2M views</span>
            <span>•</span>
            <span>{getTimeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
