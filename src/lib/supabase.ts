import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Konfigurasi Project Cloud Database Supabase untuk RaniaArchi
const DEFAULT_SUPABASE_URL = "https://cakisindhvnqamquvyxn.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNha2lzaW5kaHZucWFtcXV2eXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMjM2OTksImV4cCI6MjEwNjc5OTY5OX0.8wKq-_AYYgAOGFViZPn8C_1Cj4dJaEaWF7bPmzTQcSo";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      !supabaseUrl.includes("your-project-id") &&
      !supabaseAnonKey.includes("your-anon-key")
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
