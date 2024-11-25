// http://localhost:5173/artists/71
// http://localhost:5173/artists/427


import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../services/api.config';
import  { useAppContext } from '../../store/AppContext';
// import axios from 'axios';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type { Artist } from '../../types/artist';
import type { Release } from '../../types/release';
import { MiniLoader } from '../../components/Loader';
import { ReleaseTable } from '../../components/ReleaseTable';
import { PaginationMenu } from '../../layout/PaginationMenu';
import { ErrorPanel } from '../../components/ErrorPanel';
import { objectToQueueItem } from "../../common/objectToQueueItem";

const ArtistPage: React.FC = () => {
  const artistId = useLoaderData()<number>;
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();
  const [releases, setReleases] = useState<Release[]>([]);
  const [responseError, setResponseError] = useState<string>('');
  const [meta, setMeta] = useState<any>({});
  const { activeCategory, dispatch, player } = useAppContext();

  function playAll(release: Release) {
    const tracks:QueueItem[] = release.tracks.map((track) => { return objectToQueueItem(track)})

      dispatch({type: 'setQueueIndex', queueIndex: 0})
      dispatch({type: 'setQueue', queue: tracks});
      player!.current.play();


    // dispatch({type: 'insertMultiQueueItems', queueItems: tracks })
  }

  function addAllToQueue(release: Release) {
    const tracks:QueueItem[] = release.tracks.map((track) => { return objectToQueueItem(track)})
    dispatch({type: 'addMultiQueueItems', queueItems: tracks })
  }


  useEffect(() => {
    setLoading(true);
    api.get(`/artists/${artistId}`, {
      params: { page: pageNum, category: activeCategory, delicate: false }}
    ).then((response) => {
      setArtist(response.data.artist);
      setReleases(response.data.releases);
      setLoading(false);
      setMeta(response.data.meta);
      console.log("artist:", response.data);
    })
    .catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  }, [pageNum, activeCategory])

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
      { !loading &&
          <ContentHeader>::
            <Link to="/artists" className="breadcrumb">Artist</Link>::{
              responseError ? 'Err0r' :
                artist?.secured ? `Artist ${artist?.id}` : artist?.name
            }
          </ContentHeader>
      }
      <ContentContainer>
        {
          loading ? <MiniLoader /> : 
          
          
          ( 
            responseError ? <ErrorPanel errorMessage={responseError} /> :
              releases?.length === 0 ? <div className="empty">No releases found</div> :
              ( 
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
                      {
                        release &&
                          <div className="text-sm font-normal">
                            <span className="cursor-pointer" onClick={() => playAll(release)}>Play All</span>
                            |
                            <span className="cursor-pointer" onClick={() => addAllToQueue(release)}>Add All</span>
                          </div>
                      }
                    </div>
                    <div className="clear-both"></div>
                    <ReleaseTable release={release} />
                  </div>
                ))
              ) 
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
