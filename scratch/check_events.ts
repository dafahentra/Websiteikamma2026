import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aeeuuklxqaqzargrpilr.supabase.co';
const supabaseKey = 'sb_publishable_EcRr5-HZEpBY6RHUm0Ykxg_IlBs17lO';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEvents() {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    console.error('Error fetching events:', error);
  } else {
    console.log('Total events:', data?.length);
    data?.forEach(ev => {
      console.log(`Event: ${ev.title}`);
      console.log(`  Instagram: ${ev.contact_instagram}`);
      console.log(`  Email: ${ev.contact_email}`);
      console.log(`  WhatsApp: ${ev.contact_whatsapp}`);
    });
  }
}

checkEvents();
