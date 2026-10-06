import { overviewMock, overviewLeloiMock, stationsMock } from '../mocks/overview.mock';

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const overviewApi = {
  getStations: async () => {
    await delay(300);
    return stationsMock;
  },
  getMetrics: async () => {
    await delay();
    return overviewMock; // Tạm thời trả về summary chung
  },
  getRevenueByStation: async (stationId: string) => {
    await delay(500);
    if (stationId === 'le-loi') {
      return overviewLeloiMock.revenue;
    }
    return overviewMock.revenue;
  }
};
