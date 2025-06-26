
import React from 'react';
import { cn } from '@/lib/utils';

interface MediaFrameProps {
  device: 'phone' | 'tablet' | 'desktop';
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({ 
  device, 
  src, 
  alt, 
  className,
  children 
}) => {
  const frameStyles = {
    phone: {
      container: 'w-64 h-[520px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl',
      screen: 'w-full h-full rounded-[2rem] overflow-hidden bg-white',
      notch: 'absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-10'
    },
    tablet: {
      container: 'w-80 h-[500px] bg-gray-800 rounded-3xl p-3 shadow-2xl',
      screen: 'w-full h-full rounded-2xl overflow-hidden bg-white',
      notch: ''
    },
    desktop: {
      container: 'w-96 h-64 bg-gray-700 rounded-lg shadow-2xl',
      screen: 'w-full h-5/6 bg-white overflow-hidden',
      notch: 'w-full h-1/6 bg-gray-800 rounded-t-lg flex items-center justify-center'
    }
  };

  const style = frameStyles[device];

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div className={style.container}>
        {device === 'phone' && <div className={style.notch} />}
        {device === 'desktop' && (
          <div className={style.notch}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
        <div className={style.screen}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📱</div>
                <p>{alt}</p>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
      <div className="text-center mt-4 text-sm text-muted-foreground capitalize">
        {device} View
      </div>
    </div>
  );
};
