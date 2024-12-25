import * as React from 'react';
import { BaseProps } from '@/types';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';
