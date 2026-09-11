import { forwardRef, useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Button, ButtonVariant, ButtonSize } from '../Button';
import { cn } from '../../../lib/utils';

export interface DropdownMenuItem {
  label: string;
  icon?: string;
  command?: (e: any) => void;
}

export interface DropdownButtonProps {
  label: string;
  items: DropdownMenuItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const DropdownButton = forwardRef<HTMLDivElement, DropdownButtonProps>(({
  label,
  items,
  variant = 'secondary',
  size = 'md',
  className,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block', className)} ref={ref || containerRef}>
      <Button 
        variant={variant} 
        size={size} 
        className="flex items-center gap-3 !px-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup
      >
        <span>{label}</span>
        <div className="w-[1px] h-4 bg-current opacity-30 mx-1"></div>
        <CaretDown size={16} weight="bold" />
      </Button>
      {isOpen && (
        <div className="absolute mt-2 min-w-[200px] bg-white border border-border rounded-md shadow-lg z-50 py-1">
          {items.map((item, i) => (
            <div 
              key={i}
              className="px-4 py-2 hover:bg-surface cursor-pointer text-sm text-content-main flex items-center gap-2"
              onClick={(e) => {
                if (item.command) item.command({ originalEvent: e, item });
                setIsOpen(false);
              }}
            >
              {item.icon && <span className={item.icon}></span>}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

DropdownButton.displayName = 'DropdownButton';
