import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://futhuxplifvvmwwgdslj.supabase.co';
const supabasePublishableKey = 'sb_publishable_jni2Vkr82vOcqsYbRr17_g_q62AA-0J';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
