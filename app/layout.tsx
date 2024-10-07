import { Sidebar } from '@/components/Sidebar';

import './globals.css';

import { Karla } from 'next/font/google';

import { SupabaseProvider } from '@/providers/SupabaseProvider';
import { UserProvider } from '@/providers/UserProvider';
import { ToasterProvider } from '@/providers/ToasterProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { getPlaylistsByUserId } from '@/actions/getPlaylistsByUserId';

import { getSongsByUserId } from '@/actions/getSongsByUserId';
import { Player } from '@/components/Player';

const font = Karla({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
};

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userSongs = await getSongsByUserId();
  const userPlaylists = await getPlaylistsByUserId();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png" />
      </head>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs} playlists={userPlaylists}>
              {children}
            </Sidebar>
            {/* <Player /> */}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
