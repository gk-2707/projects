import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const YOUTUBE_API_KEY = 'AIzaSyB6TlDsQNRq9N1wmSnBQbK - rEEIuX6pZQw';

const SearchBar = ({ playSongFromList }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setResults([]);
            return;
        }

        if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY' || !YOUTUBE_API_KEY.trim()) {
            setError("YouTube API Key is not configured. Please replace 'YOUR_YOUTUBE_API_KEY' in SearchBar.jsx.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Search for videos and filter by 'Music' category (ID 10)
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=20&key=${YOUTUBE_API_KEY}`
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();

            if (data.items && data.items.length > 0) {
                const mappedResults = data.items.map((item) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    artist: item.snippet.channelTitle,
                    image: item.snippet.thumbnails.medium.url || "https://dummyimage.com/150x150/555/fff.png&text=No+Cover",
                    src: `https://www.youtube.com/embed/${item.id.videoId}`,
                }));
                setResults(mappedResults);
            } else {
                setResults([]);
                setError("No search results found from YouTube for this category/query.");
            }
        } catch (err) {
            console.error("Error searching YouTube videos:", err);
            setError("Failed to fetch search results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (video) => {
        if (video.src && typeof playSongFromList === 'function') {
            playSongFromList(video, results);
        } else {
            console.error(`No embed URL found for video: ${video.title} or playSongFromList is not a function.`);
            setError("Cannot play this video.");
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search for music videos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
                <button
                    type="submit"
                    className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <SearchIcon size={24} />
                    )}
                </button>
            </form>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {results.length === 0 && !loading && !error && query.trim() && (
                <p className="text-gray-400 text-center">No music results found for "{query}".</p>
            )}

            {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {results.map((video) => (
                        <div
                            key={video.id}
                            className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition cursor-pointer"
                            onClick={() => handlePlay(video)}
                        >
                            <img
                                src={video.image}
                                alt={video.title}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h5 className="text-white text-lg mt-2">{video.title}</h5>
                            <p className="text-sm text-gray-400">{video.artist}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
