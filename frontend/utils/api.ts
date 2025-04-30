import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

export default api;

export const fetcher = (url: string) => api.get(url).then(res => res.data);
// add post helpers
