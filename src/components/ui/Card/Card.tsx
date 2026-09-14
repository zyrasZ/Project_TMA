import { Card as PrimeCard, CardBodyProps, CardContentProps, CardFooterProps, CardHeaderProps, CardRootProps, CardSubtitleProps, CardTitleProps } from 'primereact/card';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const cardVariants = cva(
  'rounded-2xl overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border border-border shadow-sm text-content-main',
        soft: 'bg-surface border-none text-content-main',
        highlight: 'bg-grey-neutral-900 text-white border-none shadow-md',
        ghost: 'bg-transparent border-none text-content-main',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants>, Omit<CardRootProps, 'className'> {
  className?: string;
}

function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <PrimeCard.Root
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <PrimeCard.Header className={cn('flex flex-col gap-2', className)} {...props} />;
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return <PrimeCard.Title className={cn('text-heading-3 font-semibold leading-tight', className)} {...props} />;
}

function CardSubtitle({ className, ...props }: CardSubtitleProps) {
  return <PrimeCard.Subtitle className={cn('text-body-2 opacity-80', className)} {...props} />;
}

function CardContent({ className, ...props }: CardContentProps) {
  return <PrimeCard.Content className={cn('mt-4 text-body-1', className)} {...props} />;
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return <PrimeCard.Footer className={cn('mt-6 flex flex-col sm:flex-row items-center gap-3', className)} {...props} />;
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <PrimeCard.Body className={cn('flex flex-col h-full', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardSubtitle, CardContent, CardFooter, CardBody };
