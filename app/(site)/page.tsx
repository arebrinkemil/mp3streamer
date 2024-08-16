import { getSongs } from '@/actions/getSongs';
import { Header } from '@/components/Header';
import { ListItem } from '@/components/ListItem';
import { PageContent } from './components/PageContent';

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
    <div className="bg-neutral-900 rounded-lg h-screen w-full overflow-hidden overflow-y-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {' '}
            <Header>
              <div className="mb-2"></div>
            </Header>
          </AccordionTrigger>
          <AccordionContent>
            <div className="">
              <div className="mb-2">
                <h1 className="text-white text-3xl text-semibold">Welcome back</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                  <ListItem image="/images/liked.png" name="Liked Songs" href="liked" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 mb-7 px-6 max-h-[50vh] overflow-y-scroll">
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
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            <PageContent songs={songs} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      ;
    </div>
  );
}
