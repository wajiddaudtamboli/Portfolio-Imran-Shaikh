
import React from 'react';
import { useGoldTheme } from '@/contexts/GoldThemeContext';
import { cn } from '@/lib/utils';

interface GoldSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export const GoldSection: React.FC<GoldSectionProps> = ({ 
  children, 
  title, 
  subtitle, 
  className,
  id 
}) => {
  const { isPremium } = useGoldTheme();

  return (
    <section 
      id={id}
      className={cn(
        'relative py-16 overflow-hidden',
        isPremium && 'border-l-4 border-r-4 border-primary/20',
        className
      )}
    >
      {/* Gold decorative elements */}
      {isPremium && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {title && (
          <div className="text-center mb-12">
            <h2 className={cn(
              'text-4xl lg:text-5xl font-bold mb-4',
              isPremium ? 'luxury-heading' : 'text-foreground'
            )}>
              {title}
            </h2>
            {subtitle && (
              <p className="premium-subtitle max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            {isPremium && <div className="gold-divider max-w-xs mx-auto mt-6" />}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};
