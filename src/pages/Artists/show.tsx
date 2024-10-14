// http://localhost:5173/artists/71
// http://localhost:5173/artists/427


import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../configs/api';
import  { useAppContext } from '../../store/AppContext';
// import axios from 'axios';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type { Artist } from '../../types/artist';
import { MiniLoader } from '../../components/Loader';
import { ReleaseTable } from '../../components/ReleaseTable';
import { PaginationMenu } from '../../components/PaginationMenu';


const ArtistPage: React.FC = () => {
  // const data  = useLoaderData()<unknown>;
  const artistId = useLoaderData()<number>;
  // const artist:Artist = data.artist<Artist>;
  // const releases:Release[] = data.releases<Release[]>;
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();
  const [releases, setReleases] = useState<Release[]>([]);
  const [responseError, setResponseError] = useState<string>('');
  const [meta, setMeta] = useState<any>({});

  useEffect(() => {
    api.get(`/artists/${artistId}`, {
      params:{ page: pageNum, category: null, delicate: false }})
      .then((response) => {
        setArtist(response.data.artist);
        setReleases(response.data.releases);
        setLoading(false);
        setMeta(response.meta);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
        console.log(responseError)
      })
  }, [pageNum])

  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
  }
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

        <Link to="/artists" className="breadcrumb">Artist</Link>::{artist?.secured ? `Artist ${artist?.id}` : artist?.name}
      </ContentHeader>
      <ContentContainer>
        {
          loading ? <MiniLoader /> : (
            releases?.map((release:Release, index:number) => (
              <div className="artist-releases-entry" key={`artist-releases-entry-${release.id}`}>
                <div className={`text-xl ${index === 0 ? '' : 'pt-20'}`}>
                  {
                    release.artworkUrl && (
                      <div className="artwork-wrapper mb-1 mr-2">
                        <img src={release.artworkUrl} alt={release.name} className="artwork w-250 h-250" />
                      </div>
                    )
                  }


                  <Link to={`/releases/${release.id}`} className='release-title'>
                    {release.name}
                    {release.year && (` (${release.year})`)}
                  </Link>
                </div>
                <div className="clear-both"></div>
                <ReleaseTable release={release} />
              </div>
            ))  
          )
        }
      </ContentContainer>
      {
        !loading && meta?.totalPages > 1 &&
          <PaginationMenu
            pageNum={pageNum}
            totalPages={meta.totalPages}
            handlePageChange={handlePageChange}
            size={12} />
      }
    </DefaultLayout>
  );
};

export default ArtistPage;
