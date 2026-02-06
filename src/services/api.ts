import { supabase, companiesApi, roadmapsApi, insightsApi, statsApi } from '../services/supabase';

// Re-export Supabase API functions for compatibility
export const companyApi = {
  getAll: async (filters?: any) => {
    const result = await companiesApi.getAll(filters);
    return { data: result.data, error: result.error };
  },
  
  getById: async (id: string) => {
    const result = await companiesApi.getById(id);
    return { data: result.data, error: result.error };
  },
  
  create: async (data: any) => {
    const result = await companiesApi.create(data);
    return { data: result.data, error: result.error };
  },
  
  update: async (id: string, data: any) => {
    const result = await companiesApi.update(id, data);
    return { data: result.data, error: result.error };
  },
  
  delete: async (id: string) => {
    const result = await companiesApi.delete(id);
    return { data: result.data, error: result.error };
  },
  
  import: async (companies: any[]) => {
    const result = await supabase.from('companies').insert(companies);
    return { data: result.data, error: result.error };
  },
  
  export: async (filters?: any) => {
    const result = await companiesApi.getAll(filters);
    return { data: result.data, error: result.error };
  },
};

export const roadmapApi = {
  getAll: async (filters?: any) => {
    const result = await roadmapsApi.getAll(filters);
    return { data: result.data, error: result.error };
  },
  
  getById: async (id: string) => {
    const result = await roadmapsApi.getById(id);
    return { data: result.data, error: result.error };
  },
  
  getByCompany: async (companyId: string) => {
    const result = await supabase
      .from('roadmaps')
      .select('*')
      .eq('company_id', companyId)
      .order('published_at', { ascending: false });
    return { data: result.data, error: result.error };
  },
  
  create: async (data: any) => {
    const result = await roadmapsApi.create(data);
    return { data: result.data, error: result.error };
  },
  
  update: async (id: string, data: any) => {
    const result = await roadmapsApi.update(id, data);
    return { data: result.data, error: result.error };
  },
  
  delete: async (id: string) => {
    const result = await roadmapsApi.delete(id);
    return { data: result.data, error: result.error };
  },
};

export const insightApi = {
  getAll: async (params?: any) => {
    const result = await insightsApi.getAll(params);
    return { data: result.data, error: result.error };
  },
  
  getById: async (id: string) => {
    const result = await insightsApi.getById(id);
    return { data: result.data, error: result.error };
  },
  
  getPopular: async (limit?: number) => {
    const result = await insightsApi.getPopular(limit);
    return { data: result.data, error: result.error };
  },
  
  create: async (data: any) => {
    const result = await insightsApi.create(data);
    return { data: result.data, error: result.error };
  },
  
  update: async (id: string, data: any) => {
    const result = await insightsApi.update(id, data);
    return { data: result.data, error: result.error };
  },
  
  delete: async (id: string) => {
    const result = await insightsApi.delete(id);
    return { data: result.data, error: result.error };
  },
};

export const statsApi = {
  getOverview: async () => {
    const result = await statsApi.getOverview();
    return { data: result, error: null };
  },
  
  getCompaniesByRegion: async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('region')
      .not('region', 'is', null);
    
    if (error) return { data: null, error };
    
    const regionCount: Record<string, number> = {};
    data?.forEach(item => {
      regionCount[item.region] = (regionCount[item.region] || 0) + 1;
    });
    
    return { data: regionCount, error: null };
  },
  
  getRoadmapsByNode: async () => {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('node');
    
    if (error) return { data: null, error };
    
    const nodeCount: Record<string, number> = {};
    data?.forEach(item => {
      nodeCount[item.node || 'Unknown'] = (nodeCount[item.node || 'Unknown'] || 0) + 1;
    });
    
    return { data: nodeCount, error: null };
  },
  
  getTrends: async (period?: string) => {
    const { data, error } = await supabase
      .from('insights')
      .select('published_at, read_count')
      .order('published_at', { ascending: false });
    
    return { data: data || [], error };
  },
};

export const authApi = {
  login: async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({ email, password });
    return { data: result.data, error: result.error };
  },
  
  logout: async () => {
    const result = await supabase.auth.signOut();
    return { data: null, error: result.error };
  },
  
  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return { data: user, error: null };
  },
  
  refreshToken: async () => {
    const { data, error } = await supabase.auth.refreshSession();
    return { data: data?.session?.access_token, error };
  },
};

export default {
  companyApi,
  roadmapApi,
  insightApi,
  statsApi,
  authApi,
};
