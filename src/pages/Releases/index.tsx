import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer} from '../../layout/DefaultLayout';
import { AlphabetMenu } from '../../layout/AlphabetMenu';
import { useState, useEffect, FC } from 'react';
import api from '../../services/api.config';
import { MiniLoader } from '../../components/Loader';
import { PaginationMenu } from '../../layout/PaginationMenu';

const ReleasesIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [releases, setReleases] = useState<Release[]>([]);
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
    api.get('/releases', {
      params: { page: pageNum, category: null, delicate: false, letter: letter }})
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
  },[pageNum, letter])

  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Releases</span>
      </ContentHeader>
      <ContentContainer>
      {
        loading ? <MiniLoader /> : (
          <>
            <AlphabetMenu activeLetter={letter} collection="releases" handleLetterChange={handleLetterChange} />
            <div id="releases-list" className="list pt-10">
              {releases.map((release) => (
                <div className="entry">
                  <Link to={`/releases/${release.id}`}>{release.name}</Link>
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

export default ReleasesIndex;
