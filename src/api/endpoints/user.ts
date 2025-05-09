const BASE_URL = "http://127.0.0.1:8000";

const USER_API = {
    GET_USER: (id: number) => `${BASE_URL}/users/${id}`,
    LOGIN: `http://127.0.0.1:8000/login/`,
    REGISTER : `http://127.0.0.1:8000/register/`,
    ME:`http://127.0.0.1:8000/users/me/`

  };
  
export default USER_API;