import { useEffect, useRef, useState, useCallback } from "react";
import {
    Heart,
    Volume2,   // Volume high
    VolumeX,   // Volume muted
    Shuffle,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    ChevronDown, // For down arrow minimize icon
    Image, // For album cover toggle
    List, // For next up list toggle
    FileText, // For lyrics toggle
} from "lucide-react";

let player = null;
let progressInterval = null;
let lastVolume = 1;
let youtubeApiScriptLoaded = false;

const Player = ({ song, toggleFavorite, isFavorite, playNextSong, playPreviousSong, isPlayerFullscreen, togglePlayerFullscreen, currentPlaylist, currentSongIndex }) => {
    const iframeRef = useRef(null);
    const lyricsContainerRef = useRef(null);

    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [lyrics, setLyrics] = useState("");
    const [lyricsLoading, setLyricsLoading] = useState(false);
    const [lyricsError, setLyricsError] = useState(null);

    const [playerStatus, setPlayerStatus] = useState("Loading player...");
    const [mobileFullscreenContent, setMobileFullscreenContent] = useState('album');

    const fetchLyrics = useCallback(async () => {
        if (!song || !song.title || !song.artist) {
            setLyrics("");
            setLyricsError("Missing song title or artist to fetch lyrics.");
            return;
        }
        setLyricsLoading(true);
        setLyricsError(null);
        setLyrics("");

        console.log(`Attempting to fetch lyrics for "${song.title}" by "${song.artist}"...`);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (song.title.toLowerCase().includes("moonlight") && song.artist.toLowerCase().includes("xxxtentacion")) {
                setLyrics(`Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
Spotlight, uh, moonlight, uh
Nigga, why you trippin'? Get your mood right, uh
Shawty look good in the moonlight
All these pussy niggas so bad mind
`);
            } else {
                setLyricsError("Dummy lyrics not available for this song.");
            }
        } catch (err) {
            console.error("Error simulating lyrics fetch:", err);
            setLyricsError("Failed to fetch lyrics.");
        } finally {
            setLyricsLoading(false);
        }
    }, [song]);

    const updateProgress = useCallback(() => {
        if (!player) return;
        const newTime = player.getCurrentTime();
        setCurrentTime(newTime);
    }, [setCurrentTime]);

    useEffect(() => {
        if (!youtubeApiScriptLoaded && !window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            youtubeApiScriptLoaded = true;
        }

        window.onYouTubeIframeAPIReady = () => {
            if (song && iframeRef.current) {
                createPlayer();
            } else {
                setPlayerStatus("YouTube API ready, waiting for song selection...");
            }
        };

        return () => {
            if (player) {
                player.destroy();
                player = null;
            }
            clearInterval(progressInterval);
        };
    }, []);

    useEffect(() => {
        if (song) {
            setPlayerStatus("Loading song...");
            if (window.YT && window.YT.Player && iframeRef.current) {
                if (player) {
                    player.loadVideoById(song.id, 0, 'large');
                    setIsPlaying(true);
                } else {
                    createPlayer();
                }
            } else {
                setPlayerStatus("Waiting for YouTube API...");
            }
            fetchLyrics();
        } else if (!song && player) {
            player.stopVideo();
            player.destroy();
            player = null;
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            setPlayerStatus("No song selected.");
            setLyrics("");
            setLyricsError(null);
        }
    }, [song, fetchLyrics]);

    const createPlayer = () => {
        if (!iframeRef.current || !song || !window.YT || !window.YT.Player) return;
        setPlayerStatus("Initializing player...");
        player = new window.YT.Player(iframeRef.current, {
            videoId: song.id,
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                enablejsapi: 1,
                origin: window.location.origin,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError,
            },
        });
    };

    const onPlayerReady = useCallback((event) => {
        event.target.playVideo();
        setIsPlaying(true);
        setPlayerStatus("Playing");
        const currentVol = event.target.getVolume() / 100;
        setVolume(currentVol);
        setIsMuted(currentVol === 0);
        lastVolume = currentVol > 0 ? currentVol : 1;
        setDuration(event.target.getDuration());
        clearInterval(progressInterval);
        progressInterval = setInterval(updateProgress, 100);
    }, [updateProgress]);

    const onPlayerStateChange = useCallback((event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setPlayerStatus("Playing");
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, 100);
        } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            setPlayerStatus("Paused");
            clearInterval(progressInterval);
        } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setPlayerStatus("Ended");
            clearInterval(progressInterval);
            setCurrentTime(0);
            if (typeof playNextSong === 'function') playNextSong();
        } else if (event.data === window.YT.PlayerState.BUFFERING) {
            setPlayerStatus("Buffering...");
        }
    }, [playNextSong, updateProgress]);

    const onPlayerError = useCallback((event) => {
        setIsPlaying(false);
        setPlayerStatus(`Error: ${event.data}`);
    }, []);

    const togglePlay = useCallback((e) => {
        e.stopPropagation();
        if (!player) return;
        if (isPlaying) player.pauseVideo(); else player.playVideo();
    }, [isPlaying]);

    const handleVolumeChange = useCallback((e) => {
        e.stopPropagation();
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        setIsMuted(vol === 0);
        if (vol > 0) lastVolume = vol;
        if (player) player.setVolume(vol * 100);
    }, []);

    const toggleMute = useCallback((e) => {
        e.stopPropagation();
        if (!player) return;
        if (isMuted) {
            player.setVolume(lastVolume * 100);
            setVolume(lastVolume);
            setIsMuted(false);
        } else {
            lastVolume = volume;
            player.setVolume(0);
            setVolume(0);
            setIsMuted(true);
        }
    }, [isMuted, volume]);

    const handleSeekChange = useCallback((e) => {
        e.stopPropagation();
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (player) player.seekTo(time, true);
    }, []);

    const handleSkip = useCallback((direction, e) => {
        e.stopPropagation();
        if (direction === 'forward') playNextSong();
        else if (direction === 'back') playPreviousSong();
    }, [playNextSong, playPreviousSong]);

    if (!song || !song.src) return null;

    const playerBaseClasses = `
        w-full text-white shadow-lg
        transform transition-all duration-300 ease-in-out
        bg-gray-900/80 backdrop-blur-lg
    `;

    const miniPlayerLayoutClasses = `
        fixed bottom-18 left-0 right-0 z-40 h-24 rounded-t-xl
        flex flex-col border-t border-gray-700/40 shadow-lg
    `;

    const fullscreenPlayerLayoutClasses = `
        fixed inset-0 rounded-none z-50 overflow-hidden
        p-4 md:p-8 flex flex-col md:flex-row md:justify-center md:items-stretch
    `;

    const nextUpSongs = currentPlaylist.slice(currentSongIndex + 1);

    return (
        <div
            className={`${playerBaseClasses} ${isPlayerFullscreen ? fullscreenPlayerLayoutClasses : miniPlayerLayoutClasses}`}
            onClick={!isPlayerFullscreen ? togglePlayerFullscreen : undefined}
        >
            <button
                onClick={e => { e.stopPropagation(); togglePlayerFullscreen(); }}
                className={`absolute ${isPlayerFullscreen ? 'top-4 right-4' : 'hidden'} z-50 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition`}
                aria-label={isPlayerFullscreen ? "Minimize Player" : "Maximize Player"}
            >
                {isPlayerFullscreen ? <ChevronDown size={24} /> : null}
            </button>

            <div id="youtube-player-container" ref={iframeRef} className="absolute opacity-0 h-px w-px -z-10"></div>

            {isPlayerFullscreen ? (
                // Fullscreen Player Layout
                <div className="flex w-full flex-grow items-center">
                    {/* Desktop Fullscreen Left Section */}
                    <div className="hidden md:flex flex-col items-center order-1 md:order-none md:w-1/2 md:pr-8 flex-grow justify-center">
                        <img src={song.image} alt={song.title} className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-2xl shadow-purple-500/30" />
                        <h4 className="text-3xl font-bold text-white mb-1 text-center">{song.title}</h4>
                        <p className="text-xl text-gray-400 text-center mb-8">{song.artist}</p>
                        <div className="flex gap-6 items-center mb-4">
                            <button className="text-gray-400 hover:text-purple-400 hover:scale-110 active:scale-95 transition" onClick={e => e.stopPropagation()}>
                                <Shuffle size={32} />
                            </button>
                            <button onClick={e => handleSkip('back', e)} className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition">
                                <SkipBack size={40} />
                            </button>
                            <button onClick={togglePlay} className="text-white hover:text-purple-400 hover:scale-110 active:scale-95 transition">
                                {isPlaying ? <Pause size={64} /> : <Play size={64} />}
                            </button>
                            <button onClick={e => handleSkip('forward', e)} className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition">
                                <SkipForward size={40} />
                            </button>
                            <button onClick={e => { e.stopPropagation(); toggleFavorite(song); }} className=" hover:scale-110 active:scale-95 transition">
                                {isFavorite ? <Heart
                                    size={32}
                                    className="stroke-purple-400 fill-purple-400"
                                />
                                    : <Heart className="text-gray-400 hover:text-purple-400 " size={32} />}
                            </button>
                        </div>
                        <div className="flex items-center gap-2 w-full max-w-lg">
                            <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeekChange}
                                className="w-full flex-grow h-1 rounded-full appearance-none cursor-pointer focus:outline-none
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400
                            [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-400"
                                style={{ background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${(currentTime / duration) * 100}%, #9ca3af ${(currentTime / duration) * 100}%, #9ca3af 100%)` }}
                            />
                            <span className="text-sm text-gray-400">{formatTime(duration)}</span>

                        </div>

                    </div>

                    {/* Desktop Fullscreen Right Section: Lyrics (Top Half) and Next Up (Bottom Half) */}
                    <div className="hidden md:flex flex-col md:w-1/2 md:pl-8 flex-grow h-full">
                        {isPlayerFullscreen && (
                            <>
                                <div className="w-full flex-grow flex flex-col p-4 bg-gray-800 rounded-lg overflow-y-auto mb-4">
                                    <h3 className="text-xl font-bold mb-2 text-center">Lyrics</h3>
                                    {lyricsLoading && <p className="text-center text-gray-400">Loading lyrics...</p>}
                                    {lyricsError && <p className="text-center text-red-400">{lyricsError}</p>}
                                    {lyrics && !lyricsLoading && !lyricsError ? (
                                        <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                                            {lyrics}
                                        </pre>
                                    ) : (
                                        !lyricsLoading && !lyricsError && song && <p className="text-center text-gray-400">No lyrics found for this song.</p>
                                    )}
                                </div>
                                <div className="w-full flex-grow flex flex-col p-4 bg-gray-800 rounded-lg overflow-y-auto">
                                    <h3 className="text-xl font-bold mb-4 text-center">Next Up</h3>
                                    {nextUpSongs.length === 0 ? (
                                        <p className="text-center text-gray-400">No more songs in this playlist.</p>
                                    ) : (
                                        <div className="space-y-3 w-full max-w-md mx-auto">
                                            {nextUpSongs.map(nextSong => (
                                                <div key={nextSong.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                                    onClick={e => { e.stopPropagation(); }}>
                                                    <img src={nextSong.image} alt={nextSong.title} className="w-10 h-10 object-cover rounded-md" />
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="text-base font-semibold truncate">{nextSong.title}</h5>
                                                        <p className="text-sm text-gray-400 truncate">{nextSong.artist}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Fullscreen Content */}
                    <div className="md:hidden w-full h-full flex flex-col justify-between p-4">
                        {mobileFullscreenContent === 'lyrics' && (
                            <div className="w-full flex-grow flex flex-col p-4 bg-gray-800 rounded-lg overflow-y-auto mb-4">
                                <h3 className="text-xl font-bold mb-2 text-center">Lyrics</h3>
                                {lyricsLoading && <p className="text-center text-gray-400">Loading lyrics...</p>}
                                {lyricsError && <p className="text-center text-red-400">{lyricsError}</p>}
                                {lyrics && !lyricsLoading && !lyricsError ? (
                                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                                        {lyrics}
                                    </pre>
                                ) : (
                                    !lyricsLoading && !lyricsError && song && <p className="text-center text-gray-400">No lyrics found for this song.</p>
                                )}
                            </div>
                        )}
                        {mobileFullscreenContent === 'nextUp' && (
                            <div className="w-full flex-grow flex flex-col p-4 bg-gray-800 rounded-lg overflow-y-auto mb-4">
                                <h3 className="text-xl font-bold mb-4 text-center">Next Up</h3>
                                {nextUpSongs.length === 0 ? (
                                    <p className="text-gray-400 text-center">No more songs in this playlist.</p>
                                ) : (
                                    <div className="space-y-3 w-full max-w-md mx-auto">
                                        {nextUpSongs.map(nextSong => (
                                            <div key={nextSong.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                                onClick={e => { e.stopPropagation(); }}>
                                                <img src={nextSong.image} alt={nextSong.title} className="w-10 h-10 object-cover rounded-md" />
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="text-base font-semibold truncate">{nextSong.title}</h5>
                                                    <p className="text-sm text-gray-400 truncate">{nextSong.artist}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {mobileFullscreenContent === 'album' && (
                            <div className="w-full flex-grow flex flex-col items-center justify-center">
                                <img src={song.image} alt={song.title} className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-2xl shadow-purple-500/30" />
                            </div>
                        )}
                        <div className="w-full flex flex-col items-center mt-auto">
                            <div className="flex">
                                <div className="flex-col">
                                    <h4 className="text-l font-bold text-white mb-1 text-left">{song.title}</h4>
                                    <p className="text-md text-gray-400 text-left mb-8">{song.artist}</p>
                                </div>
                                <button onClick={e => { e.stopPropagation(); toggleFavorite(song); }} className="mt-4 hover:scale-110 active:scale-95 transition">
                                    {isFavorite ? <Heart
                                        size={28}
                                        className="stroke-purple-400 fill-purple-400"
                                    />
                                        : <Heart className="text-gray-400 hover:text-purple-400" size={28} />}
                                </button></div>
                            <div className="flex items-center gap-2 w-full max-w-lg">
                                <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration}
                                    value={currentTime}
                                    onChange={handleSeekChange}
                                    className="w-full flex-grow h-1 rounded-full appearance-none cursor-pointer focus:outline-none
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400
                            [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-400"
                                    style={{ background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${(currentTime / duration) * 100}%, #9ca3af ${(currentTime / duration) * 100}%, #9ca3af 100%)` }}
                                />
                                <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                            </div>
                            <div className="flex gap-6 items-center mb-4">
                                <button className="text-gray-400 hover:text-purple-400 hover:scale-110 active:scale-95 transition" onClick={e => e.stopPropagation()}>
                                    <Shuffle size={32} />
                                </button>
                                <button onClick={e => handleSkip('back', e)} className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition">
                                    <SkipBack size={40} />
                                </button>
                                <button onClick={togglePlay} className="text-white hover:text-purple-400 hover:scale-110 active:scale-95 transition">
                                    {isPlaying ? <Pause size={64} /> : <Play size={64} />}
                                </button>
                                <button onClick={e => handleSkip('forward', e)} className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition">
                                    <SkipForward size={40} />
                                </button>
                                <button onClick={toggleMute} className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition">
                                    {isMuted || volume === 0 ? <VolumeX size={32} /> : <Volume2 size={32} />}
                                </button>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={e => { e.stopPropagation(); setMobileFullscreenContent('album'); }}
                                    className={`p-3 rounded-full ${mobileFullscreenContent === 'album' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'} hover:bg-purple-500 transition`}
                                    aria-label="Show Album Cover"
                                >
                                    <Image size={24} />
                                </button>
                                <button
                                    onClick={e => { e.stopPropagation(); setMobileFullscreenContent('lyrics'); }}
                                    className={`p-3 rounded-full ${mobileFullscreenContent === 'lyrics' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'} hover:bg-purple-500 transition`}
                                    aria-label="Show Lyrics"
                                >
                                    <FileText size={24} />
                                </button>
                                <button
                                    onClick={e => { e.stopPropagation(); setMobileFullscreenContent('nextUp'); }}
                                    className={`p-3 rounded-full ${mobileFullscreenContent === 'nextUp' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'} hover:bg-purple-500 transition`}
                                    aria-label="Show Next Up List"
                                >
                                    <List size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Mini-player Layout (Desktop & Mobile)
                <div className="flex flex-col flex-grow px-4 py-3">
                    <div className="w-full flex-shrink-0">
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeekChange}
                            className="w-full flex-grow h-1 rounded-full appearance-none cursor-pointer focus:outline-none
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400
                            [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-400"
                            style={{ background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${(currentTime / duration) * 100}%, #9ca3af ${(currentTime / duration) * 100}%, #9ca3af 100%)` }}
                        />
                    </div>
                    <div className="flex items-center w-full justify-between mt-3">
                        {/* Left Section: Album Cover & Song Info */}
                        <div className="flex items-center min-w-0 flex-grow-0">
                            <img
                                src={song.image}
                                alt={song.title}
                                className="w-12 h-12 object-cover rounded-md mr-4"
                            />
                            <div className="flex flex-col min-w-0">
                                <h4 className="text-base font-semibold truncate">{song.title}</h4>
                                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                            </div>
                        </div>

                        {/* Right Section: All Controls */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            {/* Playback Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={e => handleSkip("back", e)}
                                    className="text-gray-400 hover:text-white hidden md:block hover:scale-110 active:scale-95 transition"
                                >
                                    <SkipBack size={24} />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="text-white hover:text-purple-400 hover:scale-110 active:scale-95 transition"
                                >
                                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                                </button>
                                <button
                                    onClick={e => handleSkip("forward", e)}
                                    className="text-gray-400 hover:text-white hidden md:block hover:scale-110 active:scale-95 transition"
                                >
                                    <SkipForward size={24} />
                                </button>
                            </div>

                            {/* Volume, Shuffle & Heart (desktop only) */}
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={e => e.stopPropagation()}
                                        className="text-gray-400 hover:text-purple-400 hover:scale-110 active:scale-95 transition"
                                    >
                                        <Shuffle size={20} />
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className="text-gray-400 hover:text-white hover:scale-110 active:scale-95 transition"
                                    >
                                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={volume}
                                        onClick={e => e.stopPropagation()}
                                        onChange={handleVolumeChange}
                                        className="flex-grow h-1 rounded-full appearance-none cursor-pointer focus:outline-none
                                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400
                                                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-400"
                                        style={{
                                            background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${volume * 100}%, #9ca3af ${volume * 100}%, #9ca3af 100%)`
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        toggleFavorite(song);
                                    }}
                                    className="transition-colors"
                                >
                                    {isFavorite ? (
                                        <Heart
                                            size={24}
                                            className="stroke-purple-400 fill-purple-400"
                                        />

                                    ) : (
                                        <Heart className="text-gray-400 hover:text-purple-400" size={24} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const formatTime = sec => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Player;