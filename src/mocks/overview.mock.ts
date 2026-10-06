export const overviewMock = {
  summary: {
    stations: [
      { label: 'Hoạt động', value: 3, color: '#00E396' },
      { label: 'Đóng', value: 1, color: '#A0AEC0' }, // grey
      { label: 'Hết hạn', value: 1, color: '#FF7300' }, // orange
    ],
    pumps: [
      { label: 'RON 95-III', value: 12, color: '#00E396' },
      { label: 'RON 95-V', value: 7, color: '#FF7300' },
      { label: 'RON 95-IV', value: 6, color: '#008FFB' },
      { label: 'Khác', value: 7, color: '#A0AEC0' },
    ],
    tanks: [
      { label: 'RON 95-III', value: 12, color: '#00E396' },
      { label: 'RON 95-V', value: 7, color: '#FF7300' },
      { label: 'RON 95-IV', value: 6, color: '#008FFB' },
      { label: 'Khác', value: 7, color: '#A0AEC0' },
    ],
    staff: [
      { label: 'Hoạt động', value: 16, color: '#00E396' },
      { label: 'Đã khóa', value: 4, color: '#A0AEC0' },
    ]
  },
  revenue: {
    categories: ['Ca 823742', 'Ca 823743', 'Ca 823744', 'Ca 823745', 'Ca 823746', 'Ca 823747'],
    series: [
      { name: 'RON 95-III', data: [75, 85, 45, 52, 58, 18], color: '#27ae60' },
      { name: 'RON 95-IV', data: [18, 40, 65, 85, 40, 65], color: '#3498db' },
      { name: 'RON 95-V', data: [75, 52, 30, 62, 30, 52], color: '#e67e22' },
      { name: 'RON 97-V', data: [88, 82, 75, 95, 80, 88], color: '#e74c3c' },
      { name: 'E5 RON 92-II', data: [30, 48, 18, 52, 30, 75], color: '#f1c40f' },
      { name: 'Dầu DO 0,05S-II', data: [60, 72, 32, 38, 15, 30], color: '#bdc3c7' },
      { name: 'Dầu DO 0,01S-V', data: [12, 0, 15, 15, 22, 42], color: '#1abc9c' },
      { name: 'Dầu hỏa KO', data: [12, 18, 12, 20, 48, 62], color: '#9b59b6' },
    ]
  }
};

export const overviewLeloiMock = {
  summary: {
    stations: [
      { label: 'Hoạt động', value: 2, color: '#00E396' },
      { label: 'Đóng', value: 0, color: '#A0AEC0' },
      { label: 'Hết hạn', value: 0, color: '#FF7300' },
    ],
    pumps: [
      { label: 'RON 95-III', value: 8, color: '#00E396' },
      { label: 'RON 95-V', value: 4, color: '#FF7300' },
      { label: 'RON 95-IV', value: 2, color: '#008FFB' },
      { label: 'Khác', value: 1, color: '#A0AEC0' },
    ],
    tanks: [
      { label: 'RON 95-III', value: 4, color: '#00E396' },
      { label: 'RON 95-V', value: 2, color: '#FF7300' },
      { label: 'RON 95-IV', value: 2, color: '#008FFB' },
      { label: 'Khác', value: 1, color: '#A0AEC0' },
    ],
    staff: [
      { label: 'Hoạt động', value: 10, color: '#00E396' },
      { label: 'Đã khóa', value: 1, color: '#A0AEC0' },
    ]
  },
  revenue: {
    categories: ['Ca 1', 'Ca 2', 'Ca 3', 'Ca 4', 'Ca 5', 'Ca 6'],
    series: [
      { name: 'RON 95-III', data: [35, 45, 25, 32, 28, 55], color: '#27ae60' },
      { name: 'RON 95-IV', data: [12, 20, 35, 45, 20, 35], color: '#3498db' },
      { name: 'RON 95-V', data: [45, 32, 20, 42, 20, 30], color: '#e67e22' },
      { name: 'Dầu DO 0,05S-II', data: [22, 15, 40, 25, 35, 48], color: '#bdc3c7' },
    ]
  }
};

export const stationsMock = [
  { id: 'quang-trung', name: 'Trạm Quang Trung' },
  { id: 'le-loi', name: 'Trạm Lê Lợi' },
];
