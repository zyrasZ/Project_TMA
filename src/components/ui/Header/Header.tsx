import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../Button';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navLinks?: { label: string; href: string }[];
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ logo, navLinks = [], rightElement, className, containerClassName, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between',
            containerClassName
          )}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            {logo || <img src="/logo.png" alt="TMA Logo" className="h-8" />}
          </div>

          {/* Desktop Nav */}
          {navLinks.length > 0 && (
            <nav className="hidden md:flex items-center gap-10">
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
          )}

          {/* Right Actions */}
          <div className="flex-shrink-0 flex items-center gap-4">
            {rightElement || (
              <Button variant="primary" size="md">
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }
);
Header.displayName = 'Header';
