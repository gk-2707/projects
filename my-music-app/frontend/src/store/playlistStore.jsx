import { create } from 'zustand';

const usePlaylistStore = create((set) => ({
    playlists: JSON.parse(localStorage.getItem('playlists')) || {
        'Favorite Songs': [],
    },

    addToPlaylist: (playlistName, track) =>
        set((state) => {
            const updatedPlaylist = state.playlists[playlistName] || [];

            // avoid duplicate tracks
            if (updatedPlaylist.some((t) => t.id === track.id)) return state;

            const updated = {
                ...state.playlists,
                [playlistName]: [...updatedPlaylist, track],
            };

            localStorage.setItem('playlists', JSON.stringify(updated));
            return { playlists: updated };
        }),

    removeFromPlaylist: (playlistName, trackId) =>
        set((state) => {
            const updated = {
                ...state.playlists,
                [playlistName]: state.playlists[playlistName].filter(
                    (t) => t.id !== trackId
                ),
            };
            localStorage.setItem('playlists', JSON.stringify(updated));
            return { playlists: updated };
        }),

    getPlaylist: (playlistName) =>
        JSON.parse(localStorage.getItem('playlists'))?.[playlistName] || [],
}));

export default usePlaylistStore;
