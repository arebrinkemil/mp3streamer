'use client';

import uniqid from 'uniqid';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useUploadModal } from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { parseBuffer } from 'music-metadata';

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      album: '',
      genre: '',
      length: 0,
      year: 0,
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const handleSongFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const metadata = await parseBuffer(uint8Array, 'audio/mpeg');

        console.log(metadata);

        const title = metadata.common.title || '';
        const author = metadata.common.artist || '';
        const album = metadata.common.album || '';
        const genre = metadata.common.genre ? metadata.common.genre.join(', ') : '';
        const length = metadata.format.duration || 0;
        const year = metadata.common.year || 0;

        setValue('title', title);
        setValue('author', author);
        setValue('album', album);
        setValue('genre', genre);
        setValue('length', length);
        setValue('year', year);
      } catch (error) {
        toast.error('Failed to extract metadata from the song file.');
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload.');
      }

      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload.');
      }

      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        album: values.album,
        genre: values.genre,
        length: values.length,
        year: values.year,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song is created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <Input
          id="album"
          disabled={isLoading}
          {...register('album', { required: false })}
          placeholder="Song album"
        />
        <Input
          id="genre"
          disabled={isLoading}
          {...register('genre', { required: false })}
          placeholder="Song genre"
        />
        <Input
          id="length"
          disabled={isLoading}
          {...register('length', { required: false })}
          placeholder="Song length"
        />
        <Input
          id="year"
          disabled={isLoading}
          {...register('year', { required: false })}
          placeholder="Song year"
        />

        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
            onChange={handleSongFileChange}
          />
        </div>
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
          Create
        </Button>
      </form>
    </Modal>
  );
};
