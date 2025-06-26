
import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { useGoldTheme } from '@/contexts/GoldThemeContext';

interface GoldButtonProps extends ButtonProps {
  variant?: 'solid' | 'outline' | 'luxury';
  goldEffect?: boolean;
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = 'luxury', goldEffect = true, children, ...props }, ref) => {
    const { isPremium } = useGoldTheme();

    const goldVariants = {
      luxury: 'luxury-button',
      solid: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700',
      outline: 'border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500/10 hover:text-yellow-700'
    };

    if (!isPremium) {
      return <Button ref={ref} className={className} {...props}>{children}</Button>;
    }

    return (
      <Button
        ref={ref}
        className={cn(
          goldVariants[variant],
          goldEffect && 'gold-pulse hover:scale-105 transition-all duration-300',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Button>
    );
  }
);

GoldButton.displayName = 'GoldButton';
