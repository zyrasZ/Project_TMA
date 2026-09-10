import React from 'react';

export interface BadgeProps {
  count?: number;
  max?: number;
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ count, max = 99, dot = false, className = '', children }) => {
  const renderBadge = () => {
    if (dot) {
      return <span className={`w-2 h-2 rounded-full bg-alert inline-block ${className}`}></span>;
    }

    if (count !== undefined) {
      const displayCount = count > max ? `${max}+` : count;
      return (
        <span className={`inline-flex items-center justify-center px-1.5 h-5 min-w-[20px] rounded-full bg-alert text-white text-[11px] font-bold ${className}`}>
          {displayCount}
        </span>
      );
    }
    
    return null;
  };

  if (children) {
    return (
      <div className="relative inline-flex">
        {children}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          {renderBadge()}
        </div>
      </div>
    );
  }

  return renderBadge();
};
