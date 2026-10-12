import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stationApi, GetStationsParams } from '../../../api/stations.api';

export const useGetStations = (params?: GetStationsParams) => {
  return useQuery({
    queryKey: ['stations', params],
    queryFn: () => stationApi.getStations(params),
  });
};

export const useGetStationById = (id?: string | null) => {
  return useQuery({
    queryKey: ['station', id],
    queryFn: () => id ? stationApi.getStationById(id) : Promise.resolve(null),
    enabled: !!id,
  });
};

export const useUpdateStation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updatedStation: Partial<any>) => stationApi.updateStation(updatedStation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
      queryClient.invalidateQueries({ queryKey: ['station'] });
    },
  });
};
