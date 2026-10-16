import type { Station } from '../types/station';

export const stationsMock: Station[] = [
  { id: '000001', name: 'Trạm Quang Trung', address: '10 Quang Trung, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000002', name: 'Trạm Tô Ký', address: '120 Tô Ký, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000003', name: 'Trạm Nguyễn Ảnh Thủ', address: '45 Nguyễn Ảnh Thủ, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000004', name: 'Trạm Hoàng Hoa Thám', address: '88 Hoàng Hoa Thám, Hồ Chí Minh', type: 'store', expireDate: '08/01/2025', status: 'active' },
  { id: '000006', name: 'Trạm Nguyễn Thị Thập', address: '102 Nguyễn Thị Thập, Hồ Chí Minh', type: 'store', expireDate: '10/05/2024', status: 'expired' },
];
