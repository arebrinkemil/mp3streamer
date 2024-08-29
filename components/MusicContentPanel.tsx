'use client';

import { useGetSongById } from '@/hooks/useGetSongById';
import { useLoadSongUrl } from '@/hooks/useLoadSongUrl';
import { usePlayer } from '@/hooks/usePlayer';

import { MusicInfo } from './MusicInfo';

export const MusicContentPanel = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  console.log('song', song, 'url', songUrl, 'id', player.activeId);

  if (!song || !songUrl || !player.activeId) {
    return (
      <div
        className="
          
          
          w-full
          
          h-[90px]
          px-4
          "
      >
        {}
      </div>
    );
  }

  return (
    <div
      className="
       
       
        w-full
        
        h-[90px]
        px-4
        "
    >
      {}
      <MusicInfo key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
