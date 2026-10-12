// Hàm hỗ trợ tạo dữ liệu mẫu dựa theo ID của trạm
export const getMockDataForStation = (stationId: string | null) => {
  // Khởi tạo giá trị hạt giống (seed) dựa trên ID
  const seed = parseInt(stationId?.replace(/[^0-9]/g, '') || '1') || 1;
  
  return {
    pumps: [
      { 
        id: '01', 
        name: 'Vòi 1', 
        fuelType: seed % 2 === 0 ? 'Xăng RON 95-III' : 'Dầu DO 0.05S-II', 
        isConnected: seed % 3 !== 0, 
        status: '*****', 
        liters: (2279 + seed * 10).toLocaleString(), 
        price: '9,360', 
        amount: (50000 + seed * 1000).toLocaleString(), 
        totalLiters: (179275123 + seed * 1000).toLocaleString(), 
        totalAmount: (2923277250 + seed * 10000).toLocaleString() 
      },
      { 
        id: '02', 
        name: 'Vòi 2', 
        fuelType: seed % 2 === 0 ? 'Xăng E5 RON 92-II' : 'Dầu DO 0.05S-II', 
        isConnected: seed % 4 !== 0, 
        status: '*****', 
        liters: (1672 + seed * 15).toLocaleString(), 
        price: '3,910', 
        amount: (40000 + seed * 1500).toLocaleString(), 
        totalLiters: (250250123 + seed * 2000).toLocaleString(), 
        totalAmount: (3594250123 + seed * 15000).toLocaleString() 
      },
      // Tạo thêm vòi bơm thứ 3 cho một số trạm
      ...(seed % 2 === 1 ? [{
        id: '03', 
        name: 'Vòi 3', 
        fuelType: 'Xăng RON 95-III', 
        isConnected: true, 
        status: '*****', 
        liters: (1200 + seed * 20).toLocaleString(), 
        price: '9,360', 
        amount: (30000 + seed * 500).toLocaleString(), 
        totalLiters: (110250123 + seed * 3000).toLocaleString(), 
        totalAmount: (1594250123 + seed * 25000).toLocaleString() 
      }] : [])
    ],
    tanks: [
      { 
        id: '01', 
        name: 'Bồn 1 - DO', 
        fuelType: seed % 2 === 0 ? 'Xăng RON 95-III' : 'Dầu DO 0.05S-II', 
        isConnected: true, 
        level: (35.59 + seed * 1.5).toFixed(2).replace('.', ',') + '%', 
        fuelLiters: (351559332 + seed * 5000).toLocaleString(), 
        fuelMm: (351559332 + seed * 5000).toLocaleString(), 
        waterLiters: (351559332 - seed * 2000).toLocaleString(), 
        waterMm: (351559332 - seed * 2000).toLocaleString(), 
        temp: (30.1 + seed * 0.2).toFixed(1).replace('.', ',') 
      },
      // Tạo thêm bồn thứ 2 cho một số trạm
      ...(seed % 2 === 1 ? [{
        id: '02', 
        name: 'Bồn 2 - RON95', 
        fuelType: 'Xăng RON 95-III', 
        isConnected: seed % 5 !== 0, 
        level: (45.20 + seed * 2.1).toFixed(2).replace('.', ',') + '%', 
        fuelLiters: (151559332 + seed * 3000).toLocaleString(), 
        fuelMm: (151559332 + seed * 3000).toLocaleString(), 
        waterLiters: (121559332 - seed * 1000).toLocaleString(), 
        waterMm: (121559332 - seed * 1000).toLocaleString(), 
        temp: (29.5 + seed * 0.3).toFixed(1).replace('.', ',') 
      }] : [])
    ],
    // Giả lập trạng thái mất kết nối mạng ngẫu nhiên dựa theo ID
    isCbxNetworkConnected: seed % 7 !== 0,
    isCbxConnected: seed % 6 !== 0
  };
};
