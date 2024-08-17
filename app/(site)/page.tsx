import { getSongs } from '@/actions/getSongs';
import { Header } from '@/components/Header';
import { ListItem } from '@/components/ListItem';
import { PageContent } from './components/PageContent';
import { Player } from '@/components/Player';

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
    <div className="bg-neutral-900 rounded-lg h-[inherit] w-full overflow-hidden overflow-y-hidden flex align-bottom">
      <Accordion type="single" defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {' '}
            <Header>
              <div className=""></div>
            </Header>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="h-[calc(100vh-(366px+1rem))]">
              <div className="">
                <h1 className="text-white text-3xl text-semibold">Welcome back</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                  <ListItem image="/images/liked.png" name="Liked Songs" href="liked" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="text-white h-[90px]">playlist</div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="  px-6 h-[calc(100vh-(366px+1rem))] overflow-y-scroll">
              <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
              </div>
              <div>
                <PageContent songs={songs} />

                {/* {songs.map((song) => <div>{song.title}</div>)} */}
              </div>
              <div>
                <PageContent songs={songs} />

                {/* {songs.map((song) => <div>{song.title}</div>)} */}
              </div>
              <div>
                <PageContent songs={songs} />

                {/* {songs.map((song) => <div>{song.title}</div>)} */}
              </div>
              <div>
                <PageContent songs={songs} />

                {/* {songs.map((song) => <div>{song.title}</div>)} */}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Player />
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="h-[calc(100vh-(366px+1rem))]">
              <PageContent songs={songs} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      ;
    </div>
  );
}
