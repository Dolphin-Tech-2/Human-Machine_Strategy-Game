import axios from "axios";

export const instanseAxios = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
