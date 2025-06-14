import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import { AlphabetMenu } from '@src/layout/AlphabetMenu';
import { useState, useEffect, FC } from 'react';
import api from '@src/services/api.config';
import { useAppContext } from '@src/store/AppContext';
import { MiniLoader } from '@src/components/Loader';
import { PaginationMenu } from '@src/layout/PaginationMenu';
import { ErrorPanel } from '@src/components/ErrorPanel';


const PlaylistsIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<any>({});
  const [responseError, setResponseError] = useState<string>('');
  const { secured } = useAppContext();


  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    setSearchParams({ pageNum: pageNum.toString(), letter: letter });
  }

  function handleLetterChange(letter: string) {
    setLoading(true);
    setLetter(letter);
    setPageNum(1);
    setSearchParams({ pageNum: '1', letter: letter });
  }

  useEffect(() => {
    api.get('/playlists', {
      params: { page: pageNum, category: null, delicate: secured, letter: letter }
    })
      .then((response) => {
        setPlaylists(response.data.playlists);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
        console.log("error:", responseError);
      });
  }, [pageNum, letter, secured])

  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Playlists</span>
      </ContentHeader>
      <ContentContainer>
        {
          loading ? <MiniLoader /> : (
            responseError ? <ErrorPanel errorMessage={responseError} /> :
              <>
                <AlphabetMenu activeLetter={letter} collection="playlists" handleLetterChange={handleLetterChange} />
                <div id="playlists-list" className="list pt-10">
                  {playlists.map((playlist) => (
                    <div className="entry" key={`playlist-${playlist.id}-entry`}>
                      <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                    </div>
                  ))}
                </div>
              </>
          )
        }
      </ContentContainer>
      {
        !loading && !responseError &&
        <PaginationMenu
          pageNum={pageNum}
          totalPages={meta.totalPages}
          handlePageChange={handlePageChange}
          size={12} />
      }
    </DefaultLayout>
  );
};

export default PlaylistsIndex;
