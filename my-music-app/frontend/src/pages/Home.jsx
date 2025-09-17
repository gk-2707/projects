import { useEffect, useState } from "react";

const YOUTUBE_API_KEY = 'AIzaSyB6TlDsQNRq9N1wmSnBQbK - rEEIuX6pZQw';

const Home = ({ playSongFromList }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularMusicVideos = async () => {
            if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY' || !YOUTUBE_API_KEY.trim()) {
                setError("YouTube API Key is not configured. Please replace 'YOUR_YOUTUBE_API_KEY' in Home.jsx.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                // Fetch popular videos specifically from the 'Music' category (ID 10)
                const res = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=12&key=${YOUTUBE_API_KEY}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();

                if (data.items && data.items.length > 0) {
                    const mappedVideos = data.items.map((video) => ({
                        id: video.id,
                        title: video.snippet.title,
                        artist: video.snippet.channelTitle,
                        image: video.snippet.thumbnails.medium.url || "https://dummyimage.com/150x150/555/fff.png&text=No+Cover",
                        src: `https://www.youtube.com/embed/${video.id}`,
                    }));
                    setVideos(mappedVideos);
                } else {
                    setVideos([]);
                    setError("No popular music videos found from YouTube.");
                }

            } catch (err) {
                console.error("Error fetching popular YouTube music videos:", err);
                setError("Failed to load popular music videos. Please check your YouTube API Key and network connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMusicVideos();
    }, [YOUTUBE_API_KEY]);

    const handlePlay = (video) => {
        if (video.src && typeof playSongFromList === 'function') {
            playSongFromList(video, videos);
        } else {
            console.error(`No embed URL found for video: ${video.title} or playSongFromList is not a function.`);
            setError("Cannot play this video.");
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-400">Loading popular YouTube music videos...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center">🎵 FOCKTIFY MUSIC</h1>
            <h2 className="text-2xl font-bold mt-6">🔥 Popular Music Videos (YouTube)</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-10">
                {videos.length === 0 ? (
                    <p className="text-gray-400 col-span-full text-center">No popular music videos found.</p>
                ) : (
                    videos.map((video) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
