import USER_API from "./endpoints/user";
import TRACK_API from "./endpoints/track";
import ARTIST_API from "./endpoints/artist";
import ALBUM_API from "./endpoints/album";
import PLAYBAR_API from "./endpoints/playbar";
import PLAYLIST_API from "./endpoints/playlist";
const API = {
    USER:USER_API,
    TRACK:TRACK_API,
    ARTIST:ARTIST_API,
    ALBUM:ALBUM_API,
    PLAYBAR:PLAYBAR_API,
    PLAYLIST:PLAYLIST_API
};


export default API;