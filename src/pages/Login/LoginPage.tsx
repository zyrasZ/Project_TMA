import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../../hooks/api/auth/useLogin';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useTranslation } from 'react-i18next';

const getLoginSchema = (t: any) => z.object({
  email: z.string().min(1, { message: t('login.emailRequired') }).email({ message: t('login.emailInvalid') }),
  password: z.string().min(1, { message: t('login.passwordRequired') }),
});

type LoginFormData = z.infer<ReturnType<typeof getLoginSchema>>;

export const LoginPage = () => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const loginSchema = useMemo(() => getLoginSchema(t), [t]);

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

          <h1 className="text-[32px] font-bold text-gray-900 mb-8">{t('login.title')}</h1>
          
          {loginMutation.isError && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {loginMutation.error.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tên đăng nhập */}
            <Input 
              label={t('login.emailLabel')}
              required
              {...register('email')} 
              placeholder={t('login.emailPlaceholder')}
              error={errors.email?.message}
            />

            {/* Mật khẩu */}
            <Input 
              label={t('login.passwordLabel')}
              required
              type={showPassword ? "text" : "password"} 
              {...register('password')} 
              placeholder={t('login.passwordPlaceholder')}
              error={errors.password?.message}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            
            {/* Quên mật khẩu */}
            <div className="flex justify-end">
              <Button variant="link" className="text-sm font-semibold">
                {t('login.forgotPassword')}
              </Button>
            </div>

            {/* Nút Submit */}
            <Button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="w-full mt-2 py-3.5"
            >
              {loginMutation.isPending ? t('login.submitting') : t('login.submit')}
            </Button>
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
              {t('login.illustrationText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
