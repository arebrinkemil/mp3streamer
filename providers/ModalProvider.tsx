'use client';

import { useState, useEffect } from 'react';

import { AuthModal } from '@/components/AuthModal';
import { UploadModal } from '@/components/UploadModal';
import { PlaylistModal } from '@/components/PlaylistModal';

export const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <PlaylistModal />
    </>
  );
};
