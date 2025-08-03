import { authService } from '../services/auth.service';
import { useEffect, useState } from 'react';

export const useAuth = (redirectTo: 'bookList' | 'login') => {
  const [data, setData] = useState<{ username: string }>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    authService
      .getUserInfo()
      .then((res) => setData(res))
      .catch((e) => setError(e));
  }, []);
  console.log(data);
  if (error && redirectTo === 'login') {
    window.location.href = '/login';
  }
  if (data && data.username && redirectTo === 'bookList') {
    window.location.href = '/books';
  }
  return data;
};
