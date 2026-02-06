import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Company, Roadmap, Insight, User } from '../types';

interface AppState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // UI状态
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;

  // 数据缓存
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  roadmaps: Roadmap[];
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  insights: Insight[];
  setInsights: (insights: Insight[]) => void;

  // 搜索状态
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 用户状态
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // UI状态
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // 数据缓存
      companies: [],
      setCompanies: (companies) => set({ companies }),
      roadmaps: [],
      setRoadmaps: (roadmaps) => set({ roadmaps }),
      insights: [],
      setInsights: (insights) => set({ insights }),

      // 搜索状态
      globalSearch: '',
      setGlobalSearch: (search) => set({ globalSearch: search }),
    }),
    {
      name: 'semiconductor-platform-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
