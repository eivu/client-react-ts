// http://localhost:5173/artists/71
// http://localhost:5173/artists/427


import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
// import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type { Artist } from '../../types/artist';
import { MiniLoader } from '../../components/Loader';
import convertSecondsToTimeHhMmSs from '../../common/convertSecondsToTimeHhMmSs';



const ArtistPage: React.FC = () => {
  const artist:Artist  = useLoaderData();
  const topRowKeyClassNames   = "py-2 pr-2 font-mono font-medium leading-6 whitespace-nowrap border-slate-100 dark:border-slate-400/10"
  const keyClassNames   = topRowKeyClassNames.concat(" border-t")
  const topRowvalueClassNames = "break-words py-2 pl-2 font-mono leading-6 whitespace-pre border-slate-100 dark:border-slate-400/10 text-wrap"
  const valueClassNames = topRowvalueClassNames.concat(" border-t")

  // const [loading, setLoading] = useState<boolean>(true);
  // const [responseError, setResponseError] = useState<String | undefined>(undefined);
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // // From queue page
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  return (
    <DefaultLayout>
      {
        // artist.artworkUrl && (
        //   <div className="flex justify-left">
        //     {/* <img src={artist.artworkUrl} alt={artist.name} className="w-64 h-64" /> */}
        //   </div>
        // )
      }
      <ContentHeader>::
        <Link to="/artists" className="breadcrumb">Artist</Link>::{artist.secured ? `Artist ${artist.id}` : artist.name}
      </ContentHeader>
      <ContentContainer>
        {/* { 
          releases.map((release:Release) => (
            <ReleaseTable release={release} />
          )
        } */}
        {
          releases.map((release:Release, index:number) => (
            <div key={`release-div-${release.id}`}>
              <>
                <div className={`text-xl ${index === 0 ? '' : 'pt-20'}`}>
                  {release.name}
                  {release.year && (` (${release.year})`)}
                </div>
              </>
              <ReleaseTable release={release} />
            </div>
          ))  
        }
      </ContentContainer>
      <PaginationMenu
            pageNum={pageNum}
            totalPages={data.meta.totalPages}
            handlePageChange={console.log("oi")}
            size={12} />
    </DefaultLayout>
  );
};

export default ArtistPage;
