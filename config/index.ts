const dev = process.env.NODE_ENV !== "production";
export const API_URL = dev ? "http://localhost:3000/api/" : "https://your_deployment.server.com";
export const COLLECTION_COLORS = ["#dc3429", "#7f3e8e", "#0099df", "#00b75a", "#fddc59", "#2d495f"];
