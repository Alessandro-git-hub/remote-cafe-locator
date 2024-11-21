import { supabase } from './supabase';

export const registerUser = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error registering user:', error.message);
    return { success: false, message: error.message };
  }

  const { user } = data;
  const { error: insertError } = await supabase.from('users').insert({
    id: user.id, // Use Supabase-generated user ID
    email,
    name,
    profile_picture: null, // Optional field
  });

  if (insertError) {
    console.error('Error inserting user data:', insertError.message);
    return { success: false, message: insertError.message };
  }

  return { success: true, message: 'User registered successfully', data: user };
};
