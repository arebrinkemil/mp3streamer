'use client';

import { MusicContentPanel } from '@/components/MusicContentPanel';

export const MusicContent = () => {
  return (
    <div className="mt-4 text-neutral-400">
      No songs available
      <div>
        <MusicContentPanel />
      </div>
    </div>
  );
};
