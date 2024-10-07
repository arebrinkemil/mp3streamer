'use client';

import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MediaItem } from '@/components/MediaItem';
import { LikeButton } from '@/components/LikeButton';
import { useOnPlay } from '@/hooks/useOnPlay';

import { Playlists, Song } from '@/types';

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ params }) => {
  const { playlistId } = params;
  const supabaseClient = useSupabaseClient();
  const [playlist, setPlaylist] = useState<Playlists | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    const fetchPlaylistAndSongs = async () => {
      try {
        const { data: playlistData, error: playlistError } = await supabaseClient
          .from('playlists')
          .select('*')
          .eq('id', playlistId)
          .single();

        if (playlistError) {
          throw new Error(playlistError.message);
        }

        setPlaylist(playlistData);

        const { data: songsData, error: songsError } = await supabaseClient
          .from('playlist_songs')
          .select('songs (id, title)')
          .eq('playlist_id', playlistId);

        if (songsError) {
          throw new Error(songsError.message);
        }

        const extractedSongs = songsData.map((item: any) => item.songs);
        setSongs(extractedSongs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistAndSongs();
  }, [playlistId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-[#EFEFEF]">
      <h1>{playlist?.name}</h1>
      <ul>
        {songs.map((song) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPage;
