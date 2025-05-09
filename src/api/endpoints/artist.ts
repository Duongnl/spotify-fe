const BASE_URL = "http://127.0.0.1:8000";

const ARTIST_API = {
  GET_ARTIST: (id: string) => `${BASE_URL}/artists/${id}`,
  GET_ARTISTS: `${BASE_URL}/artists`,
};
export default ARTIST_API;