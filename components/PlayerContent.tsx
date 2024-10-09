'use client';

import { useEffect, useState } from 'react';

import { Song } from '@/types';

import { usePlayer } from '@/hooks/usePlayer';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2';

import { MediaItem } from './MediaItem';
import { LikeButton } from './LikeButton';
import { AddToPlaylist } from './AddToPlaylist';
import { Slider } from './Slider';
import useSound from 'use-sound';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNextSong = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPreviousSong = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNextSong();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        h-full
        bg-[#AD3E39]/5
        rounded-lg
        hover:bg-[#AD3E39]/20
        transition
        p-3
        "
    >
      <div className="flex w-full justify-start items-center gap-x-4">
        <MediaItem data={song} />
        <LikeButton songId={song.id} />
        <AddToPlaylist songId={song.id} />
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-full
            bg-[#AD3E39]
            p-1
            cursor-pointer
            "
        >
          <Icon size={30} className="text-white" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillBackward
          onClick={onPlayPreviousSong}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-[#EFEFEF] transition"
        />
        <div
          onClick={handlePlay}
          className="
            flex items-center justify-center
            h-10 w-10
            rounded-full
            bg-[#AD3E39]
            cursor-pointer
            "
        >
          <Icon size={30} className="text-white" />
        </div>
        <AiFillStepForward
          onClick={onPlayNextSong}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-[#EFEFEF] transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className="cursor-pointer text-[#AD3E39]" size={34} />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};
