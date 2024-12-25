import * as React from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  outline:
    'border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-secondary dark:hover:bg-secondary/50 dark:hover:text-secondary-foreground',
}

const Button = React.forwardRef(
  ({ className, variant = 'default', _size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          buttonVariants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
