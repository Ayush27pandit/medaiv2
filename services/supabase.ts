import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function addDose({
  medicine_id,
  date,
  time,
  status,
}: {
  medicine_id: string;
  date: string;
  time: string;
  status: string;
}) {
  return supabase.from("doses").insert([{ medicine_id, date, time, status }]);
}

export async function getDosesForDate(date: string) {
  return supabase.from("doses").select("*").eq("date", date);
}
