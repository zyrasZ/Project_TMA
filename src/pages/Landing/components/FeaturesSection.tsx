import { ChargingStation, GasPump, Receipt, Buildings, UserSwitch, ChartPieSlice } from '@phosphor-icons/react';

const FEATURES = [
  {
    icon: <ChargingStation size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Giám sát trạm trực tuyến',
    description: 'Giám sát từ xa và trực tuyến mọi thông số và hoạt động bơm xăng tại trạm.',
  },
  {
    icon: <GasPump size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Quản lý dữ liệu mã bơm',
    description: 'Tự động lưu dữ liệu và tạo mã bơm ngay khi bơm xong. Dễ dàng thanh toán và xuất hoá đơn ngay lập tức.',
  },
  {
    icon: <Receipt size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Tích hợp hóa đơn điện tử',
    description: 'Tích hợp với tất cả các đơn vị cung cấp hoá đơn điện tử. Hỗ trợ xuất hoá đơn "một chạm" ngay trong phần mềm.',
  },
  {
    icon: <Buildings size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Hỗ trợ vận hành doanh nghiệp',
    description: 'Kết nối tất cả cửa hàng của doanh nghiệp, quản lý dữ liệu tập trung. Tối ưu chi phí quản lý doanh nghiệp.',
  },
  {
    icon: <UserSwitch size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Quản lý chia ca cho trạm xăng',
    description: 'Chia ca và chốt ca tự động. Hỗ trợ công cụ lưu tiền nộp, tiền quỹ và kiểm kê khi chốt ca.',
  },
  {
    icon: <ChartPieSlice size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
    title: 'Báo cáo thống kê',
    description: 'Phân tích chuyên sâu từng hạng mục và chỉ số bán hàng. Xuất báo cáo chi tiết theo từng ngày, tháng, quý và năm.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 md:px-10 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-content-main mb-20">
          Các tính năng phần mềm IGAS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-5 px-8 py-10 rounded-2xl min-h-[296px] border border-transparent hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-content-main mb-1">
                {feature.title}
              </h3>
              <p className="text-content-sub leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
