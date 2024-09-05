import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log('heres fault' + sessionError.message);
    return [];
  }

  console.log('sessionData', sessionData);

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', '63fb6f45-caf0-4b49-b11c-38f5464d16ce')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('heres fault2' + error.message);
  }
  return (data as any) || [];
};
