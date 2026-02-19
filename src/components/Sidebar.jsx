import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "🎬", label: "Shorts" },
    { icon: "📺", label: "Subscriptions" },
  ];

  const libraryItems = [
    { icon: "📚", label: "Library" },
    { icon: "🕒", label: "History", path: "/history" },
    { icon: "🎥", label: "Your videos" },
    { icon: "⏰", label: "Watch Later" },
    { icon: "👍", label: "Liked videos" },
  ];

  const subscriptions = [
    "MrBeast",
    "PewDiePie",
    "Markiplier",
    "MKBHD",
    "Linus Tech Tips",
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-14 bottom-0 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${isOpen ? 'w-60' : 'w-20'} transition-all duration-300 z-30 border-r border-gray-200`}>
        <div className="py-3">
          {/* Main Menu */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className={`w-full flex items-center gap-6 px-6 py-2.5 hover:bg-gray-100 transition-colors ${!isOpen && 'justify-center px-0'}`}
              >
                <span className="text-2xl">{item.icon}</span>
                {isOpen && <span className="text-gray-900 text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </div>

          {isOpen && (
            <>
              {/* Library */}
              <div className="border-b border-gray-200 pb-3 mb-3">
                {libraryItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Subscriptions */}
              <div className="pb-3">
                <h3 className="px-6 py-2 text-gray-900 text-sm font-semibold">Subscriptions</h3>
                {subscriptions.map((channel, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-4 px-6 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(channel)}&background=random&size=24`}
                      alt={channel}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-900 text-sm truncate">{channel}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar (Overlay) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={(e) => e.target === e.currentTarget && window.history.back()}>
          <div className="absolute inset-0 bg-black/50"></div>
          <aside className="absolute left-0 top-0 w-60 h-full bg-white overflow-y-auto animate-slide-in">
            <div className="py-3">{/* Main Menu */}
              <div className="border-b border-gray-200 pb-3 mb-3">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Library */}
              <div className="border-b border-gray-800 pb-3 mb-3">
                {libraryItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Subscriptions */}
              <div className="pb-3">
                <h3 className="px-6 py-2 text-white text-sm font-semibold">Subscriptions</h3>
                {subscriptions.map((channel, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-4 px-6 py-2.5 hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(channel)}&background=random&size=24`}
                      alt={channel}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-white text-sm truncate">{channel}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
