import { useQuery } from '@tanstack/react-query';
import { overviewApi } from '../../../api/overview.api';

export const useGetOverviewMetrics = () => {
  return useQuery({
    queryKey: ['overview-metrics'],
    queryFn: () => overviewApi.getMetrics(),
  });
};

export const useGetStations = () => {
  return useQuery({
    queryKey: ['overview-stations'],
    queryFn: () => overviewApi.getStations(),
  });
};

export const useGetRevenueByStation = (stationId: string) => {
  return useQuery({
    queryKey: ['revenue-metrics', stationId],
    queryFn: () => overviewApi.getRevenueByStation(stationId),
    enabled: !!stationId,
  });
};
