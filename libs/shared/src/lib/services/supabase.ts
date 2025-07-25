import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabse.types';

export const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey)
  throw new Error('Missing Supabase environment variables');

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
