import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.timeout = 20000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export default axios;
