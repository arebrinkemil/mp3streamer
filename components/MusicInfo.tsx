import { useEffect, useState } from 'react';
import { Song } from '@/types';
import Image from 'next/image';
import { useLoadImage } from '@/hooks/useLoadImage';

interface MusicInfoProps {
  song: Song;
  songUrl: string;
}

export const MusicInfo: React.FC<MusicInfoProps> = ({ song, songUrl }) => {
  const imageUrl = useLoadImage(song);
  let playTime = song.length / 60;
  playTime = Math.round(playTime * 100) / 100;

  return (
    <div className=" px-4">
      <div className="w-1/3">
        <Image
          width={50}
          height={50}
          src={imageUrl || '/images/liked.png'}
          alt="Media Item"
          className="w-full h-full object-cover"
        />
      </div>
      <h2>{song.title}</h2>
      <p>{song.author}</p>
      <p>{song.album}</p>
      <p>{song.genre}</p>
      <p>{playTime}</p>
      <p>{song.year}</p>
    </div>
  );
};
