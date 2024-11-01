import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7082/swagger", //altere para o endereço da sua api
});

export default api;
