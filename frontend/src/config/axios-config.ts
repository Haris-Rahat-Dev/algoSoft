import axios from "axios";
import { BASE_URL } from "../contants";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your actual API base URL
});

export default axiosInstance;
