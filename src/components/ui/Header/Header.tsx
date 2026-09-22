import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Button } from '../Button';
import { Toolbar } from 'primereact/toolbar';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navLinks?: { label: string; href: string }[];
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ logo, navLinks = [], rightElement, className, containerClassName, ...props }, ref) => {
    const navigate = useNavigate();
    
    const startContent = (
      <React.Fragment>
        {logo || <img src="/logo.png" alt="TMA Logo" className="h-8" />}
      </React.Fragment>
    );

    const centerContent = navLinks.length > 0 ? (
      <nav className="flex items-center gap-10">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="text-body-2 font-semibold text-content-main hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    ) : undefined;

    const endContent = (
      <React.Fragment>
        {rightElement || (
          <Button 
            variant="primary" 
            className="h-[40px] px-5 !text-white font-semibold transition-colors duration-300 ease-out hover:bg-turquoise-700"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
        )}
      </React.Fragment>
    );

    return (
      <header
        ref={ref}
        className={cn(
          'fixed top-0 z-50 w-full bg-transparent transition-all duration-300',
          className
        )}
        {...props}
      >
        <Toolbar.Root
          className={cn(
            'max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between bg-transparent border-none p-0 w-full',
            containerClassName
          )}
        >
          <Toolbar.Start className="flex-shrink-0 flex items-center cursor-pointer">
            {startContent}
          </Toolbar.Start>
          <Toolbar.Center className="hidden md:flex items-center">
            {centerContent}
          </Toolbar.Center>
          <Toolbar.End className="flex-shrink-0 flex items-center gap-4">
            {endContent}
          </Toolbar.End>
        </Toolbar.Root>
      </header>
    );
  }
);
Header.displayName = 'Header';
