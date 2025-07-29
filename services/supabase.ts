import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yqfpgjovmakilaakhlvp.supabase.co'; // <-- Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZnBnam92bWFraWxhYWtobHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMTY0NTUsImV4cCI6MjA2ODc5MjQ1NX0.XhjghWItT9S-8530PtRakbFxrLYlYZc6FNu_7XgUtDI'; // <-- Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function addDose({ medicine_id, date, time, status }: { medicine_id: string, date: string, time: string, status: string }) {
  return supabase.from('doses').insert([{ medicine_id, date, time, status }]);
}

export async function getDosesForDate(date: string) {
  return supabase.from('doses').select('*').eq('date', date);
} 