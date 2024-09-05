'use client';

import { useGetSongById } from '@/hooks/useGetSongById';
import { useLoadSongUrl } from '@/hooks/useLoadSongUrl';
import { usePlayer } from '@/hooks/usePlayer';
import { Song } from '@/types';
import { MusicInfo } from './MusicInfo';

interface MusicContentPanelProps {
  songs: Song[];
}

export const MusicContentPanel: React.FC<MusicContentPanelProps> = ({ songs }) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  console.log('song', song, 'url', songUrl, 'id', player.activeId);

  if (!song || !songUrl || !player.activeId) {
    return <div className="w-full h-[90px] px-4">{}</div>;
  }

  return (
    <div className="w-full h-[90px]">
      <MusicInfo key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
