import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationMenu as PRNavigationMenu } from 'primereact/navigationmenu';
import { Menu as PRMenu } from 'primereact/menu';
import { User, CaretDown } from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
import type { RootState } from '../../../store';
import { logout } from '../../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

// Cấu trúc Wrapper dựa theo PrimeReact V11 Headless
function NavigationMenu({ className, ...props }: any) {
  return (
    <PRNavigationMenu
      className={cn(
        'flex items-center w-full justify-between h-16 px-6 bg-white border-b border-divide',
        className
      )}
      {...props}
    />
  );
}

function NavItem({ children, isActive, onClick, className }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center px-4 h-full cursor-pointer select-none no-underline',
        'bg-transparent outline-none text-sm transition-colors',
        'border-b-2',
        isActive 
          ? 'border-turquoise-700 text-turquoise-700 font-semibold' 
          : 'border-transparent text-content-sub hover:text-content-main font-medium',
        className
      )}
    >
      {children}
    </button>
  );
}

function NavMenuTrigger({ className, isActive, ...props }: any) {
  return (
    <PRMenu.Trigger
      className={cn(
        'inline-flex items-center justify-center px-4 h-full cursor-pointer select-none no-underline',
        'bg-transparent outline-none text-sm transition-colors',
        'border-b-2',
        isActive 
          ? 'border-turquoise-700 text-turquoise-700 font-semibold' 
          : 'border-transparent text-content-sub hover:text-content-main font-medium',
        'data-[state=open]:text-content-main',
        className
      )}
      {...props}
    />
  );
}

export const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const currentPath = location.pathname;
  
  const user = useSelector((state: RootState) => state.auth.user);

  const getIsActive = (path: string) => currentPath.startsWith(path);

  return (
    <header className="shrink-0 relative z-50">
      <NavigationMenu
        className={cn(
          'flex items-center w-full justify-between h-16 px-8 bg-white border-b border-divide'
        )}
      >
        {/* Left Side: Logo & Links */}
        <div className="flex items-center h-full">
          <div className="flex items-center mr-12">
            <img src="/logo.png" alt="TMA Logo" className="h-10 object-contain" />
          </div>

          <nav className="hidden md:flex items-center space-x-6 h-full">
            <NavItem 
              isActive={getIsActive('/admin/companies')} 
              onClick={() => navigate('/admin/companies')}
            >
              {t('navbar.companies')}
            </NavItem>
            
            <NavItem 
              isActive={getIsActive('/admin/devices')} 
              onClick={() => navigate('/admin/devices')}
            >
              {t('navbar.devices')}
            </NavItem>
            
            <NavItem 
              isActive={getIsActive('/admin/logs')} 
              onClick={() => navigate('/admin/logs')}
            >
              {t('navbar.logs')}
            </NavItem>

            {/* Dropdown Menu - Công cụ */}
            <PRMenu.Root>
              <NavMenuTrigger>
                {t('navbar.tools')}
                <CaretDown weight="bold" className="w-3 h-3 ml-1 opacity-70" />
              </NavMenuTrigger>
              <PRMenu.Portal>
                <PRMenu.Positioner className="z-50 outline-none">
                  <PRMenu.Popup className="min-w-[12rem] bg-white rounded-lg shadow-md border border-border p-1 outline-none mt-1">
                    <PRMenu.List className="m-0 p-0 list-none">
                      <PRMenu.Item className="py-2 px-4 text-sm text-content-main hover:bg-grey-primary-50 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-grey-primary-50">
                        {t('navbar.option1')}
                      </PRMenu.Item>
                      <PRMenu.Item className="py-2 px-4 text-sm text-content-main hover:bg-grey-primary-50 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-grey-primary-50">
                        {t('navbar.option2')}
                      </PRMenu.Item>
                    </PRMenu.List>
                  </PRMenu.Popup>
                </PRMenu.Positioner>
              </PRMenu.Portal>
            </PRMenu.Root>
          </nav>
        </div>

        {/* Right Side: Profile */}
        <div className="flex items-center space-x-4">
          <PRMenu.Root>
            <PRMenu.Trigger className="flex items-center focus:outline-none cursor-pointer border-none bg-transparent p-0 m-0 rounded-full">
              <Avatar shape="circle" className="h-8 w-8 border border-border hover:opacity-80 transition-opacity">
                 {user?.avatar && <AvatarImage src={user.avatar} alt="User Avatar" />}
                 <AvatarFallback className="bg-grey-neutral-60">
                   <User className="h-5 w-5 text-content-sub" weight="fill" />
                 </AvatarFallback>
              </Avatar>
            </PRMenu.Trigger>
            <PRMenu.Portal>
              <PRMenu.Positioner className="z-50 outline-none">
                <PRMenu.Popup className="min-w-[12rem] bg-white rounded-lg shadow-md border border-border p-1 outline-none mt-1">
                  <div className="px-4 py-2 border-b border-divide mb-1">
                    <p className="text-sm font-semibold text-content-main truncate">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-content-sub truncate">{user?.email || 'admin@example.com'}</p>
                  </div>
                  <PRMenu.List className="m-0 p-0 list-none">
                    <PRMenu.Item className="py-2 px-4 text-sm text-content-main hover:bg-grey-primary-50 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-grey-primary-50">
                      {t('navbar.myAccount')}
                    </PRMenu.Item>
                    <PRMenu.Item 
                      className="py-2 px-4 text-sm text-alert hover:bg-red-60 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-red-60 font-medium"
                      onSelect={() => {
                        dispatch(logout());
                        navigate('/login');
                      }}
                    >
                      {t('navbar.logout')}
                    </PRMenu.Item>
                  </PRMenu.List>
                </PRMenu.Popup>
              </PRMenu.Positioner>
            </PRMenu.Portal>
          </PRMenu.Root>
        </div>
      </NavigationMenu>
    </header>
  );
};
