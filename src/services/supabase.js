import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sarshtdtbwtttyapakxp.supabase.co";
//Supabase Row Level Security-val hozzálehet férni a key-hez, nem tudják hackelni csak akiknek engedélyeztük a KEy hozzáférést a Supabase policy-ba.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcnNodGR0Ynd0dHR5YXBha3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMjE0MDIsImV4cCI6MjAyNjU5NzQwMn0.xNeFYlunDyS192Swkv2-Ef0KMWxpnRxs0R7om_yC6EM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
