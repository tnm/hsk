import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const buttonVariants = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  outline:
    'border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-secondary dark:hover:bg-secondary/50 dark:hover:text-secondary-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          buttonVariants[variant],
          size === 'sm' && 'h-9 px-3',
          size === 'lg' && 'h-11 px-8',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
