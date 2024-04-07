import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return await Promise.reject(
      error.response.data?.message ??
        "Something went wrong. Please try again later."
    );
  }
);

export default instance;
