import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  withCredentials: true,
});

const register = async (username: string, password: string) => {
  await client.post('/auth/register', { username, password });
};

const login = async (username: string, password: string) => {
  await client.post('/auth/login', { username, password });
};

const logout = async () => {
  await client.post('/auth/logout');
};

const getUserInfo = async () => {
  const response = await client.get<{ username: string }>('/auth/user');
  return response.data;
};

export const authService = {
  register,
  login,
  logout,
  getUserInfo,
};
