const Library = ({ favorites, setCurrentSong }) => {
    // Ensure favorites is an array, defaulting to an empty array if undefined
    const songsToDisplay = favorites || [];

    return (
        <div className="p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">❤️ Favorite Songs</h2>
            {songsToDisplay.length === 0 ? (
                <p className="text-gray-400">No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {songsToDisplay.map((song) => (
                        <div
                            key={song.id}
                            className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition cursor-pointer"
                            onClick={() => setCurrentSong(song)}
                        >
                            <img
                                src={song.cover || song.image} // 'image' will be from YouTube thumbnail
                                alt={song.name || song.title}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h5 className="text-white text-lg mt-2">{song.name || song.title}</h5>
                            <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Library;
