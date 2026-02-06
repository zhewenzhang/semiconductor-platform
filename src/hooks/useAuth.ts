import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/api';
import { useAppStore } from '../stores';
import type { User } from '../types';

export const useAuth = () => {
  const { user, setUser, isAuthenticated, logout } = useAppStore();
  
  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
};

export const useLogin = () => {
  const { setUser } = useAppStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: (response: any) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      queryClient.setQueryData(['user'], user);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('token');
      logout();
      queryClient.clear();
    },
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getProfile(),
    select: (response) => response.data as User,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authApi.refreshToken(),
    onSuccess: (response: any) => {
      const { token } = response.data;
      localStorage.setItem('token', token);
    },
  });
};
