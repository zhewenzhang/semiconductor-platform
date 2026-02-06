import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roadmapApi } from '../services/api';
import type { Roadmap, RoadmapFilters, PaginatedResponse } from '../types';

export const useRoadmaps = (filters?: RoadmapFilters) => {
  return useQuery({
    queryKey: ['roadmaps', filters],
    queryFn: () => roadmapApi.getAll(filters),
    select: (response) => response.data as PaginatedResponse<Roadmap>,
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => roadmapApi.getById(id),
    select: (response) => response.data as Roadmap,
    enabled: !!id,
  });
};

export const useCompanyRoadmaps = (companyId: string) => {
  return useQuery({
    queryKey: ['roadmaps', 'company', companyId],
    queryFn: () => roadmapApi.getByCompany(companyId),
    select: (response) => response.data as Roadmap[],
    enabled: !!companyId,
  });
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Roadmap>) => roadmapApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};

export const useUpdateRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Roadmap> }) => 
      roadmapApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => roadmapApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};
