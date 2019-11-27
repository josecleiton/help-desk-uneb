import axios from "axios";

const api = axios.create({
  baseURL: "https://hduneb.000webhostapp.com/api"
});

export default api;
