import axios from "axios";
import { API } from "./API";

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
