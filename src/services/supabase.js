import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jyjrpjlznwaasyexewqt.supabase.co";
//Supabase Row Level Security-val hozzálehet férni a key-hez, nem tudják hackelni csak akiknek engedélyeztük a KEy hozzáférést a Supabase policy-ba.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5anJwamx6bndhYXN5ZXhld3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2OTAyODYsImV4cCI6MjA0MzI2NjI4Nn0.UlLK1g_rOdbu_5OwRuCQP-Opqv2Q7ARCrMxqU0rQZg0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
