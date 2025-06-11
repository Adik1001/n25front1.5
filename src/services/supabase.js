// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Замените на свои значения из Supabase Project Settings
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;