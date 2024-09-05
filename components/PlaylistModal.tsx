'use client';

import uniqid from 'uniqid';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { usePlaylistModal } from '@/hooks/usePlaylistModal'; // Using the Zustand store
import { useUser } from '@/hooks/useUser';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';

export const PlaylistModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const playlistModal = usePlaylistModal(); // Zustand hook
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      playlistModal.onClose(); // Closing the modal using Zustand
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];

      if (!imageFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`playlist-image-${values.name}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload.');
      }

      const { error: supabaseError } = await supabaseClient.from('playlists').insert({
        user_id: user.id,
        name: values.name,
        description: values.description,
        image_path: imageData.path,
      });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Playlist created!');
      reset();
      playlistModal.onClose(); // Close modal on successful submit
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create a Playlist"
      description="Add a name, description, and upload an image"
      isOpen={playlistModal.isOpen} // Zustand-controlled open state
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="name"
          disabled={isLoading}
          {...register('name', { required: true })}
          placeholder="Playlist name"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register('description', { required: false })}
          placeholder="Playlist description"
        />
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create Playlist
        </Button>
      </form>
    </Modal>
  );
};
