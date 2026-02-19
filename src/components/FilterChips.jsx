import { useState } from "react";

export default function FilterChips() {
  const [selected, setSelected] = useState("All");

  const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "News",
    "Sports",
    "Learning",
    "Fashion",
    "Comedy",
    "Podcasts",
    "Tech",
    "Movies",
    "Cooking",
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-3 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${selected === category 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
