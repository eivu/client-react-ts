import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import { useAppContext } from '@src/store/AppContext';
import { useState, useEffect, FC } from 'react';
import type { Playlist } from '@src/types/playlist';
import { MiniLoader } from '@src/components/Loader';
import api from '@src/services/api.config';
// import { PlaylistTable } from '@src/components/PlaylistTable';
import { ErrorPanel } from '@src/components/ErrorPanel';
import { PlaylistControls } from '@src/components/PlaylistControls';


const PlaylistPage: React.FC = () => {
  const titlePrefix = "EIVU::Playlists::";
  const playlistId = useLoaderData();
  const [title, setTitle] = useState<string | undefined>("Loading...");
  const [loading, setLoading] = useState<boolean>(true);
  const [playlist, setPlaylist] = useState<Playlist>();
  const [responseError, setResponseError] = useState<string>('');
  const { activeCategory } = useAppContext();

  useEffect(() => {
    setTitle(responseError ? 'Err0r' :
      playlist?.secured ?
        `Playlist ${playlist?.id}` : playlist?.name);
    document.title = titlePrefix + title;
  }, [playlist])

  useEffect(() => {
    setLoading(true);
    api.get(`/playlists/${playlistId}`, {
      params: { category: activeCategory, delicate: false }
    }
    ).then((response) => {
      console.log(response.data)
      setPlaylist(response.data.playlist);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  }, [activeCategory])

  return (
    <DefaultLayout>
      {
        playlist?.artworkUrl && (
          <div className="flex justify-left">
            <img src={playlist?.artworkUrl} alt={playlist?.name} className="w-64 h-64" />
          </div>
        )
      }
      {
        !loading && (
          <ContentHeader>::
            <span><Link to="/playlists" className="breadcrumb">Playlist</Link>::{
              responseError ? 'Err0r' : playlist?.name
            }</span>
            {
              playlist?.artists?.length > 0 &&
              <div>
                {/* BY */}
                {playlist.artists.map((artist) => {
                  return (
                    <Link to={`/artists/${artist.id}`} className="pr-2" key={`artist-link-${artist.id}`}>{artist.name}</Link>
                  )
                })
                }
              </div>
            }
            {playlist && <PlaylistControls playlist={playlist} />}
          </ContentHeader>
        )
      }
      <ContentContainer>
        {/* {
          loading ? <MiniLoader /> :
            responseError ? <ErrorPanel errorMessage={responseError} /> : <PlaylistTable playlist={playlist} />
        } */}
      </ContentContainer>
    </DefaultLayout>
  );
};

export default PlaylistPage;
