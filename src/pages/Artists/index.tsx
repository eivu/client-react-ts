import React from 'react';
import DefaultLayout from '@src/layout/DefaultLayout';
import { ContentContainer, ContentHeader } from '@src/layout/DefaultLayout';
import { AlphabetMenu } from '@src/layout/AlphabetMenu';
import { MiniLoader } from '@src/components/Loader';
import { PaginationMenu } from '@src/layout/PaginationMenu';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ErrorPanel } from '@src/components/ErrorPanel';
import  { useAppContext } from '@src/store/AppContext';
import api from '@src/services/api.config';



const ArtistsIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [artists, setArtists] = useState<Artist[]>([]);
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
    api.get('/artists', {
      params: { page: pageNum, category: null, delicate: secured, letter: letter }})
      .then((response) => {
        setArtists(response.data.artists);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
        console.log("error:", responseError);
      });
  },[pageNum, letter, secured])


  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Artists</span>
      </ContentHeader>
      <ContentContainer>
      {           responseError &&  <ErrorPanel errorMessage={responseError} /> }
      {
        loading ? <MiniLoader /> : !responseError && (
          <>
            <AlphabetMenu activeLetter={letter} collection="artists" handleLetterChange={handleLetterChange} />
            <div id="artists-list" className="list pt-10">
              {artists.map((artist) => (
                <div className="entry" key={`artist-${artist.id}-entry`}>
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
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

export default ArtistsIndex;

