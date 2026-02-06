import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Helper functions for common operations

// Companies
export const companiesApi = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (filters.region) {
      query = query.eq('region', filters.region);
    }
    if (filters.industry) {
      query = query.eq('industry', filters.industry);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    return query;
  },
  
  getById: async (id) => {
    return supabase.from('companies').select('*').eq('id', id).single();
  },
  
  create: async (data) => {
    return supabase.from('companies').insert(data).select().single();
  },
  
  update: async (id, data) => {
    return supabase.from('companies').update(data).eq('id', id).select().single();
  },
  
  delete: async (id) => {
    return supabase.from('companies').delete().eq('id', id);
  },
};

// Roadmaps
export const roadmapsApi = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('roadmaps')
      .select('*, companies(*)')
      .order('published_at', { ascending: false });
    
    if (filters.companyId) {
      query = query.eq('company_id', filters.companyId);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    return query;
  },
  
  getById: async (id) => {
    return supabase
      .from('roadmaps')
      .select('*, companies(*)')
      .eq('id', id)
      .single();
  },
  
  create: async (data) => {
    return supabase.from('roadmaps').insert(data).select().single();
  },
  
  update: async (id, data) => {
    return supabase.from('roadmaps').update(data).eq('id', id).select().single();
  },
  
  delete: async (id) => {
    return supabase.from('roadmaps').delete().eq('id', id);
  },
};

// Insights
export const insightsApi = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('insights')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    return query;
  },
  
  getById: async (id) => {
    return supabase.from('insights').select('*').eq('id', id).single();
  },
  
  getPopular: async (limit = 10) => {
    return supabase
      .from('insights')
      .select('*')
      .eq('status', 'published')
      .order('read_count', { ascending: false })
      .limit(limit);
  },
  
  create: async (data) => {
    return supabase.from('insights').insert(data).select().single();
  },
  
  update: async (id, data) => {
    return supabase.from('insights').update(data).eq('id', id).select().single();
  },
  
  delete: async (id) => {
    return supabase.from('insights').delete().eq('id', id);
  },
  
  incrementReadCount: async (id) => {
    return supabase.rpc('increment_read_count', { insight_id: id });
  },
};

// Stats
export const statsApi = {
  getOverview: async () => {
    const [companies, roadmaps, insights] = await Promise.all([
      supabase.from('companies').select('id', { count: 'exact', head: true }),
      supabase.from('roadmaps').select('id', { count: 'exact', head: true }),
      supabase.from('insights').select('id', { count: 'exact', head: true }),
    ]);
    
    return {
      totalCompanies: companies.count || 0,
      activeRoadmaps: roadmaps.count || 0,
      publishedInsights: insights.count || 0,
    };
  },
};

// Auth
export const authApi = {
  signUp: async (email, password) => {
    return supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return supabase.auth.signOut();
  },
  
  getSession: async () => {
    return supabase.auth.getSession();
  },
  
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default supabase;
