'use client';

import { useGetSongById } from '@/hooks/useGetSongById';
import { useLoadSongUrl } from '@/hooks/useLoadSongUrl';
import { usePlayer } from '@/hooks/usePlayer';

import { PlayerContent } from './PlayerContent';

export const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

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
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
