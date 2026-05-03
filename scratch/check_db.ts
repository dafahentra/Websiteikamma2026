import { supabase } from './src/lib/supabase';

async function checkSettings() {
  const { data, error } = await supabase.from('site_settings').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
}

checkSettings();
