import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../../hooks/useLogin';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Cột trái: Form Đăng Nhập */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-[120px] py-10 relative">
        <div className="w-full max-w-[400px] mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <img src="/logo.png" alt="TMA Logo" className="h-12 object-contain" />
          </div>

          <h1 className="text-[32px] font-bold text-gray-900 mb-8">Đăng nhập</h1>
          
          {loginMutation.isError && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {loginMutation.error.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tên đăng nhập */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                {...register('email')} 
                placeholder="Nhập tên đăng nhập"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#18A0A0]/20 focus:border-[#18A0A0] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  {...register('password')} 
                  placeholder="Nhập mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#18A0A0]/20 focus:border-[#18A0A0] transition-colors pr-10 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
            </div>
            
            {/* Quên mật khẩu */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-semibold text-[#18A0A0] hover:text-[#127a7a] transition-colors">
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút Submit */}
            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="w-full py-3.5 px-4 bg-[#18A0A0] hover:bg-[#127a7a] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loginMutation.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>


        </div>
      </div>

      {/* Cột phải: Hình ảnh Illustration và Text */}
      <div className="hidden md:flex md:w-[55%] items-center justify-center p-6 lg:p-10 h-screen">
        
        {/* Khung nền màu Gradient */}
        <div 
          className="w-full h-full max-w-[788px] max-h-[90vh] flex flex-col items-center justify-center rounded-[16px] px-6 lg:px-10 py-8 lg:py-10"
          style={{ 
            background: 'linear-gradient(180deg, #2ADFDF 0%, #0D5959 100%)',
          }}
        >
          {/* Vùng chứa hình ảnh minh họa */}
          <div className="flex-1 flex items-center justify-center w-full min-h-0">
            <img 
              src="/Login/Fuel station-rafiki.svg" 
              alt="Fuel Station Illustration" 
              className="w-full h-full max-w-[708px] max-h-[700px] object-contain drop-shadow-lg"
            />
          </div>

          {/* Khung Text giới thiệu */}
          <div className="w-full max-w-[708px] mt-6 lg:mt-12 min-h-[100px] lg:min-h-[128px] shrink-0 bg-[#1E2020]/20 backdrop-blur-[20px] rounded-[16px] p-6 lg:p-[32px] flex items-center">
            <p className="text-white text-base lg:text-xl font-medium leading-relaxed">
              Quản lý và tra cứu dữ liệu các trạm bơm, xuất hóa đơn tự động và thủ công
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
