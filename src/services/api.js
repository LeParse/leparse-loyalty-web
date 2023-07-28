import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3002",
  baseURL: "https://api.leparse.tech/loyalty",
});

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem(
      "$leparse-loyalty-token"
    );

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location = "/login?expiredToken=true";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
