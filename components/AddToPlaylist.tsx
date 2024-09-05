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
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // Import Supabase client
import { useUser } from '@/hooks/useUser'; // Hook to get the current user
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
  const { user } = useUser(); // Get the current user
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // State to hold playlists
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  // Function to fetch playlists from Supabase
  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from('playlists') // Assuming your table is named 'playlists'
        .select('*')
        .eq('user_id', user?.id); // Fetch playlists where the user_id matches the current user

      if (error) {
        throw error;
      }

      setPlaylists(data || []); // Set playlists state
    } catch (error) {
      toast.error('Error fetching playlists');
    } finally {
      setLoading(false);
    }
  };

  // Fetch playlists when the sheet opens
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
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={24}
          />{' '}
          {/* Playlist icon */}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add to Playlist</SheetTitle>
            <SheetDescription>Select a playlist to add the song.</SheetDescription>
          </SheetHeader>

          {loading ? (
            <p>Loading...</p> // Show loading state
          ) : (
            <div className="flex flex-col gap-y-2">
              {playlists.length === 0 ? (
                <p>No playlists found.</p> // Show this if no playlists are found
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

  // Function to handle adding the song to a playlist
  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      const { error } = await supabaseClient
        .from('playlist_songs') // Assuming you have a join table 'playlist_songs'
        .insert({
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
};
