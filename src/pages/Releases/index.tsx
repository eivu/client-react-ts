import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer} from '@src/layout/DefaultLayout';
import { AlphabetMenu } from '@src/layout/AlphabetMenu';
import { useState, useEffect, FC } from 'react';
import api from '@src/services/api.config';
import  { useAppContext } from '@src/store/AppContext';
import { MiniLoader } from '@src/components/Loader';
import { PaginationMenu } from '@src/layout/PaginationMenu';
import { ErrorPanel } from '@src/components/ErrorPanel';


const ReleasesIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [releases, setReleases] = useState<Release[]>([]);
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
    api.get('/releases', {
      params: { page: pageNum, category: null, delicate: secured, letter: letter }})
      .then((response) => {
        setReleases(response.data.releases);
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
        <span>::Releases</span>
      </ContentHeader>
      <ContentContainer>
      {
        loading ? <MiniLoader /> : (
          responseError ? <ErrorPanel errorMessage={responseError} /> :
            <>
              <AlphabetMenu activeLetter={letter} collection="releases" handleLetterChange={handleLetterChange} />
              <div id="releases-list" className="list pt-10">
                {releases.map((release) => (
                  <div className="entry" key={`release-${release.id}-entry`}>
                    <Link to={`/releases/${release.id}`}>{release.name}</Link>
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

export default ReleasesIndex;
