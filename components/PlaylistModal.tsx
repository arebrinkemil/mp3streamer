//simple modal component
import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';

interface PlaylistModalProps {
  isOpen: boolean;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({ isOpen }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-white font-bold text-2xl">Create Playlist</h1>
      <Input placeholder="Playlist Name" />
      <Input placeholder="Playlist Description" />
      <Button>Create Playlist</Button>
    </div>
  );
};
