import { authService } from '../services/auth.service';
import React, { useEffect } from 'react';

export const LogoutPage: React.FC = () => {
  useEffect(() => {
    const fn = async () => {
      await authService.logout();
      window.location.href = '/login';
    };
    fn();
  });

  return <></>;
};
