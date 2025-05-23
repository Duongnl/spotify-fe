const BASE_URL = "http://127.0.0.1:8000";

const TRACK_API = {
  GET_TRACK: (id: string) => `${BASE_URL}/tracks/${id}`,
  GET_TRACKS:`${BASE_URL}/tracks`,
  GET_TRACK_ARTISTS :`${BASE_URL}/tracks/basic-with-artists/`
};
export default TRACK_API;