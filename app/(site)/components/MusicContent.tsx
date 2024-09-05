'use client';

import { MusicContentPanel } from '@/components/MusicContentPanel';
import { Song } from '@/types';

interface MusicContentProps {
  songs: Song[];
}

export const MusicContent: React.FC<MusicContentProps> = ({ songs }) => {
  return (
    <div className="mt-4 text-neutral-400">
      <div>
        <MusicContentPanel songs={songs} />
      </div>
    </div>
  );
};
