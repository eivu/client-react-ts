import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ContentContainer, ContentHeader } from '../../layout/DefaultLayout';
import { AlphabetMenu } from '../../layout/AlphabetMenu';
import { MiniLoader } from '../../components/Loader';
import { PaginationMenu } from '../../layout/PaginationMenu';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';



const ArtistsIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<any>({});
  const [responseError, setResponseError] = useState<string>('');

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
      params: { page: pageNum, category: null, delicate: false, letter: letter }})
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
  },[pageNum, letter])


  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Artists</span>
      </ContentHeader>
      <ContentContainer>
      {
        loading ? <MiniLoader /> : (
          <>
            <AlphabetMenu activeLetter={letter} collection="artists" handleLetterChange={handleLetterChange} />
            <div id="artists-list" className="list pt-10">
              {artists.map((artist) => (
                <div className="entry">
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </div>
              ))}
            </div>
          </>
        )
      }
      </ContentContainer>
      {
        !loading &&
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

