import type { Station } from '../types/station';

export const stationsMock: Station[] = [
  { id: '000001', name: 'Trạm Quang Trung', address: '10 Quang Trung, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000002', name: 'Trạm Tô Ký', address: '120 Tô Ký, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000003', name: 'Trạm Nguyễn Oanh', address: '238 Nguyễn Oanh, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000004', name: 'Trạm Nguyễn Huệ', address: '100 Nguyễn Huệ, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'expired' },
  { id: '000005', name: 'Trạm Lê Lợi', address: '12 Lê Lợi, Hồ Chí Minh', type: 'store', expireDate: '09/02/2025', status: 'active' },
  { id: '000006', name: 'Trạm CMT8', address: '500 Cách Mạng Tháng 8, Hồ Chí Minh', type: 'store', expireDate: '10/05/2024', status: 'expired' },
];
