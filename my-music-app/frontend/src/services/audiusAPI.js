const BASE_URL = 'https://api.audius.co/v1';
const APP_NAME = 'Focktify';

export const searchTracks = async (query) => {
    const res = await fetch(`${BASE_URL}/tracks/search?query=${query}&app_name=${APP_NAME}`);
    const data = await res.json();
    return data.data;
};

export const getTrendingTracks = async () => {
    const res = await fetch(`${BASE_URL}/tracks/trending?app_name=${APP_NAME}`);
    const data = await res.json();
    return data.data;
};

export const getStreamUrl = (trackId) =>
    `${BASE_URL}/tracks/${trackId}/stream?app_name=${APP_NAME}`;
