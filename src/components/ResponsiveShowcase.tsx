
import React from 'react';
import { MediaFrame } from './MediaFrame';
import { GoldSection } from './GoldSection';

export const ResponsiveShowcase: React.FC = () => {
  return (
    <GoldSection 
      title="Responsive Design Excellence" 
      subtitle="Optimized for all devices and screen sizes"
      className="bg-muted/20"
    >
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
        <MediaFrame
          device="phone"
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop"
          alt="Mobile Portfolio View"
        />
        <MediaFrame
          device="tablet"
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop"
          alt="Tablet Portfolio View"
        />
        <MediaFrame
          device="desktop"
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
          alt="Desktop Portfolio View"
        />
      </div>
    </GoldSection>
  );
};
