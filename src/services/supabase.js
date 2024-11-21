import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzttqklnzclcynkdqthb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dHRxa2xuemNsY3lua2RxdGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzUwNDUsImV4cCI6MjA0Nzc1MTA0NX0.66xWV7TbKGLtmerwyePqxYE5uiavAmp2Ge1I5tyPsdc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
