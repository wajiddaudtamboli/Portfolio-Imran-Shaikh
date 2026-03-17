
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
};

type Session = {
  user?: User | null;
} | null;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin (username: Imran)
  const isAdmin = user?.user_metadata?.username === 'Imran' || user?.email === 'imran@admin.com';

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session with error handling
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('Error getting initial session:', error);
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to get initial session:', error);
        setLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Authentication is disabled.') };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign in error:', error);

        // Handle specific error types
        let errorMessage = error.message;
        if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and Supabase configuration.";
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = "Invalid email or password. Please try again.";
        }

        return { error };
      }
      return { error: null };
    } catch (e: unknown) {
      console.error('Sign in error:', e);

      const err = e as { message?: string; name?: string };
      let errorMessage = "An unexpected error occurred during sign in.";
      if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
        errorMessage = "Unable to connect to the server. Please check your Supabase configuration in the .env file.";
      }

      return { error: e };
    }
  };

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Sign up is disabled.') };
    }
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
            full_name: fullName,
          }
        }
      });

      if (error) {
        return { error };
      }
      return { error: null };
    } catch (e: unknown) {
      return { error: e };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return;
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return;
      }
    } catch (e: unknown) {
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
