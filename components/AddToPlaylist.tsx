import React, { useEffect, useState } from 'react';
import { FaRegListAlt } from 'react-icons/fa';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-hot-toast';

interface Playlist {
  id: string;
  name: string;
}

interface AddToPlaylistProps {
  songId: string;
}

export const AddToPlaylist: React.FC<AddToPlaylistProps> = ({ songId }) => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from('playlists')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      setPlaylists(data || []);
    } catch (error) {
      toast.error('Error fetching playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      const { error } = await supabaseClient.from('playlist_songs').insert({
        playlist_id: playlistId,
        song_id: songId,
      });

      if (error) {
        throw error;
      }

      toast.success('Song added to playlist!');
    } catch (error) {
      toast.error('Error adding song to playlist');
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <FaRegListAlt
            className="text-neutral-400 cursor-pointer hover:text-[#EFEFEF] transition"
            size={24}
          />{' '}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add to Playlist</SheetTitle>
            <SheetDescription>Select a playlist to add the song.</SheetDescription>
          </SheetHeader>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-y-2">
              {playlists.length === 0 ? (
                <p>No playlists found.</p>
              ) : (
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    className="border border-gray-300 rounded p-2 hover:bg-gray-100"
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                  </button>
                ))
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
