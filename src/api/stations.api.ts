import { stationsMock } from '../mocks/stations.mock';
import type { Station } from '../types/station';

// Giả lập Database nội bộ
let db = [...stationsMock];

export interface GetStationsParams {
  search?: string;
  province?: string | null;
  type?: string | null;
  status?: string | null;
  first?: number;
  rows?: number;
}

export interface GetStationsResponse {
  data: Station[];
  total: number;
}

export const stationApi = {
  // Lấy chi tiết trạm
  getStationById: async (id: string): Promise<Station | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const station = db.find(s => s.id === id);
        resolve(station ? { ...station } : null);
      }, 500);
    });
  },
  
  // Lấy danh sách trạm
  getStations: async (params?: GetStationsParams): Promise<GetStationsResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...db];
        
        if (params?.search) {
          const s = params.search.toLowerCase();
          filtered = filtered.filter(st => 
            st.name.toLowerCase().includes(s) || 
            st.address.toLowerCase().includes(s) ||
            st.id.toLowerCase().includes(s)
          );
        }
        
        if (params?.status && params.status !== 'all') {
          filtered = filtered.filter(st => st.status === params.status);
        }

        // Logic cho province và type ở đây (giả lập đơn giản)
        if (params?.type && params.type !== 'all') {
          filtered = filtered.filter(st => st.type === params.type);
        }
        
        const total = filtered.length;
        
        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }
        
        resolve({ data: filtered, total });
      }, 500); // Giả lập độ trễ mạng 500ms
    });
  },
  
  // Cập nhật trạm
  updateStation: async (updatedStation: Partial<Station>): Promise<Station> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = db.findIndex(s => s.id === updatedStation.id);
        if (index !== -1) {
          db[index] = { ...db[index], ...updatedStation };
          resolve(db[index]);
        } else {
          reject(new Error("Station not found"));
        }
      }, 500);
    });
  }
};
