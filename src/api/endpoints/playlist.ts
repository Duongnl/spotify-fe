
const BASE_URL = "http://127.0.0.1:8000";
const PLAYLIST_API = {
    GET_PLAYLIST: (id: string) => `${BASE_URL}/playlists/${id}`,
    PLAYLIST: `${BASE_URL}/playlists/`,
    PLAYLIST_TRACK: `${BASE_URL}/playlist-tracks/`
  };
  
export default PLAYLIST_API;