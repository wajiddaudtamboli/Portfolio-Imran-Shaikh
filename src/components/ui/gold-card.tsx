
import React from 'react';
import { Card, CardProps } from './card';
import { cn } from '@/lib/utils';
import { useGoldTheme } from '@/contexts/GoldThemeContext';

interface GoldCardProps extends CardProps {
  luxury?: boolean;
  animated?: boolean;
}

export const GoldCard = React.forwardRef<HTMLDivElement, GoldCardProps>(
  ({ className, luxury = true, animated = true, children, ...props }, ref) => {
    const { isPremium } = useGoldTheme();

    if (!isPremium) {
      return <Card ref={ref} className={className} {...props}>{children}</Card>;
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'gold-card',
          luxury && 'gold-shadow',
          animated && 'hover:scale-105 transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

GoldCard.displayName = 'GoldCard';
