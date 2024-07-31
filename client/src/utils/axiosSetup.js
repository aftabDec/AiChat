import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/auth//verify-token",
            { refreshToken }
          );
          localStorage.setItem("token", data.accessToken);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        } catch (err) {
          console.error("Refresh token error", err);
          // Optionally, handle the case where the refresh token is invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
