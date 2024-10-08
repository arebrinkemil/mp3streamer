import { getSongs } from '@/actions/getSongs';
import { Header } from '@/components/Header';
import { ListItem } from '@/components/ListItem';
import { PageContent } from './components/PageContent';
import { MusicContent } from './components/MusicContent';
import { Player } from '@/components/Player';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900  h-[inherit] w-full overflow-hidden overflow-y-hidden flex align-bottom">
      <Accordion type="single" defaultValue="item-1" className="w-full">
        <AccordionItem className="bg-[#AD3E39] " value="item-1">
          <AccordionTrigger>
            {' '}
            <Header>
              <div className=""></div>
            </Header>
          </AccordionTrigger>
          <AccordionContent className="pb-0 bg-[#3E0D09] ">
            <div className="h-[calc(100vh-(366px+1rem))]">
              <div className="">
                <h1 className="text-[#ad3e3a] text-6xl font-semibold">Playlists</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                  <ListItem image="/images/liked.png" name="Liked Songs" href="liked" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-[#AD3E39] " value="item-2">
          <AccordionTrigger>
            <div className="text-[#EFEFEF] h-[90px] flex items-end">
              <h1 className="text-6xl">All Music</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 bg-[#3E0D09] ">
            <ScrollArea className="px-6 h-[calc(100vh-(366px+1rem))]">
              <div className="flex justify-between items-center">
                <h1 className="text-[#ad3e3a] text-6xl font-semibold">Newest Songs</h1>
              </div>
              <div>
                <PageContent songs={songs} />

                {/* {songs.map((song) => <div>{song.title}</div>)} */}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-[#0C1617] " value="item-3">
          <AccordionTrigger>
            <Player />
          </AccordionTrigger>
          <AccordionContent className="pb-0 bg-[#969897] ">
            <div className="h-[calc(100vh-(366px+1rem))]">
              <MusicContent songs={songs} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      ;
    </div>
  );
}
