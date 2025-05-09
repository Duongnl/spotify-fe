const BASE_URL = "http://127.0.0.1:8000";

const ALBUM_API = {
  GET_ALBUM: (id: string) => `${BASE_URL}/albums/${id}`,
  GET_ALBUMS :`${BASE_URL}/albums`,
};
export default ALBUM_API;