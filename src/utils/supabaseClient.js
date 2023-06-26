import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = window.env.SUPABASE_URL;
const SUPBASE_ANON_KEY = window.env.SUPABASE_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);

export default supabaseClient;