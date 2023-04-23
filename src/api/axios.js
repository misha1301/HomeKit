import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const BASE_URL = "http://localhost:5500";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { ContentType: "application/json" },
  withCredentials: true,
});
