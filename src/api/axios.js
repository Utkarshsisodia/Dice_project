import axios from 'axios';

// Create a custom axios instance pointing to your LIVE server
const api = axios.create({
  baseURL: 'https://primedice-backend.onrender.com/api', 
  withCredentials: true, // This allows Axios to handle the secure cookies
});

// Interceptor to handle expired Access Tokens seamlessly
api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // FIXED: Added check so we don't infinitely retry the refresh-token endpoint itself!
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/auth/refresh-token'
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh-token');
        const newAccessToken = res.data.data.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;