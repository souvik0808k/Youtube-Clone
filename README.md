# 🎥 YouTube Clone

A modern, responsive YouTube clone built with React, Vite, and Tailwind CSS. Features include video browsing, watch page with recommendations, YouTube Shorts section, and watch history tracking.

## ✨ Features

- 🎬 **Video Grid** - Browse trending videos with thumbnails, views, and channel info
- 📺 **Watch Page** - Full video player with like/dislike, subscribe, share, and download buttons
- 🎯 **Smart Sidebar** - Fixed recommendations that stay visible while scrolling
- ⚡ **Shorts Section** - Horizontal scrolling shorts on home and watch pages
- 💬 **Comments Section** - Interactive comments with like/reply functionality
- 🔍 **Filter Chips** - Category filters for content discovery
- 📜 **Watch History** - Track and view your recently watched videos
- 🎨 **YouTube UI** - Clean white theme matching YouTube's modern interface
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **YouTube Data API v3** - Fetch real video data
- **LocalStorage** - Watch history persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- YouTube Data API v3 key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/souvik0808k/Youtube-Clone.git
cd Youtube-Clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your YouTube API key:
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Getting a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

## 📂 Project Structure

```
vite-project/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Left sidebar navigation
│   │   ├── FilterChips.jsx     # Category filters
│   │   ├── VideoCard.jsx       # Video thumbnail card
│   │   ├── Watchpage.jsx       # Video player page
│   │   └── WatchHistory.jsx    # Watch history page
│   ├── App.jsx                 # Main app & routing
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables (not in git)
├── .env.example              # Environment template
└── package.json              # Dependencies

```

## 🎯 Key Features Explained

### Watch Page Layout
- Left column: Video player, description, comments, and Shorts
- Right column: Fixed recommendations sidebar that stays visible while scrolling
- Interactive buttons: Like/Dislike, Subscribe, Share, Save

### Filter System
- Sticky category chips that stay visible while scrolling
- Smooth horizontal scrolling
- Active state highlighting

### Responsive Sidebar
- Collapsible on desktop (wide/narrow modes)
- Mobile-friendly overlay on small screens
- Smooth transitions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📝 License

This project is for educational purposes only. YouTube and its trademarks are property of Google LLC.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 👨‍💻 Author

**Souvik Kumar**
- GitHub: [@souvik0808k](https://github.com/souvik0808k)

---

Made with ❤️ using React and Tailwind CSS

