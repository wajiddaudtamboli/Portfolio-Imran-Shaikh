// Supabase integration intentionally disabled for this project build.
// The UI will run entirely on local/static fallback content.
//
// NOTE: We keep the same exports (`supabase`, `isSupabaseConfigured`) so the
// rest of the codebase stays unchanged, but we do not initialize or log anything.

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const isSupabaseConfigured = false;

export const supabase: SupabaseClient<Database> = (() => {
  const errorFactory = () => {
    throw new Error('Supabase integration is disabled.');
  };

  return new Proxy(
    {},
    {
      get() {
        return errorFactory;
      },
    }
  ) as unknown as SupabaseClient<Database>;
})();