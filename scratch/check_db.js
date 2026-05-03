import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  console.log('Checking events table...');
  const { error: eventError } = await supabase.from('events').select('category').limit(1);
  if (eventError) {
    console.log('Events category error:', eventError.message);
  } else {
    console.log('Events category exists');
  }

  console.log('\nChecking info_mahasiswa table...');
  const { error: infoError } = await supabase.from('info_mahasiswa').select('work_type').limit(1);
  if (infoError) {
    console.log('Info work_type error:', infoError.message);
  } else {
    console.log('Info work_type exists');
  }
}

checkColumns();
