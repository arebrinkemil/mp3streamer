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
    <div
      style={{ backgroundImage: `url(${imageUrl || '/images/liked.png'})` }}
      className=" bg-cover bg-left flex flex-row w-full h-[calc(100vh-(366px+1rem))]"
    >
      <div className="grow w-full">
        <div className="">
          {/* <Image
            width={50}
            height={50}
            src={imageUrl || '/images/liked.png'}
            alt="Media Item"
            className="w-full h-full object-crop"
          /> */}
        </div>
      </div>
      <div className="grow w-full flex flex-col justify-center items-center text-xl text-black">
        <div>
          <h2>{song.title}</h2>
          <p>{song.author}</p>
          <p>{song.album}</p>
          <p>{song.genre}</p>
          <p>{playTime}</p>
          <p>{song.year}</p>
        </div>
      </div>
    </div>
  );
};

//bg-gradient-to-l from-[#3E0D09] via-[#3E0D09]
