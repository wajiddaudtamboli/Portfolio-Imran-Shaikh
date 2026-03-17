import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';

interface ProfileInfo {
  name?: string;
  title?: string;
  profile_image?: string;
  [key: string]: any;
}

interface ProfileContextType {
  profileInfo: ProfileInfo;
  setProfileInfo: (info: ProfileInfo) => void;
  refreshProfileInfo: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({});

  const refreshProfileInfo = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('portfolio_settings')
        .select('setting_value')
        .eq('setting_key', 'profile_info')
        .single();
      if (!error && data?.setting_value) {
        setProfileInfo(data.setting_value);
      }
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

  useEffect(() => {
    refreshProfileInfo();
  }, []);

  return (
    <ProfileContext.Provider value={{ profileInfo, setProfileInfo, refreshProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
}; 