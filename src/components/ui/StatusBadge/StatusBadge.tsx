import React from 'react';

export type StatusColor = 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'grey';
export type StatusShape = 'circle' | 'square';

export interface StatusBadgeProps {
  color: StatusColor;
  label: string;
  shape?: StatusShape;
  className?: string;
}

const colorMap: Record<StatusColor, string> = {
  blue: 'bg-info', // 3385D7
  green: 'bg-success', // 41C881
  orange: 'bg-orange-500', // E05A00
  red: 'bg-alert', // FF1B0A
  yellow: 'bg-warning', // FFBE0A
  grey: 'bg-content-hint', // 969C9C
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ color, label, shape = 'circle', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`block w-2.5 h-2.5 ${colorMap[color]} ${shape === 'circle' ? 'rounded-full' : 'rounded-[2px]'}`}></span>
      <span className="text-sm font-medium text-content-main">{label}</span>
    </div>
  );
};
