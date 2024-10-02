import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { AlphabetMenu, ContentHeader, ContentContainer} from '../../layout/DefaultLayout';
import { useMemo, useState, useEffect, FC } from 'react';
import api from '../../configs/api';
import { MiniLoader } from '../../components/Loader';
import { PaginationMenu } from '../../components/PaginationMenu';

const ReleasesIndex: React.FC = () => {
  const letter = '';
  const [pageNum, setPageNum] = useState<number>(1);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<any>({});
  const [responseError, setResponseError] = useState<string>('');


  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    console.log('pageNum', pageNum);
  }

  useEffect(() => {
    api.get('/releases', {
      params: { page: pageNum, category: null, delicate: false, letter: letter }})
      .then((response) => {
        setReleases(response.data.releases);
        setMeta(response.data.meta);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
      });
  },[pageNum])

  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Releases</span>
      </ContentHeader>
      <ContentContainer>
        <AlphabetMenu collection="releases" />

      {
        loading ? <MiniLoader /> : (
          <div id="releases-list" className="pt-10">
            {releases.map((release) => (
              <div className="entry">
                <Link to={`/releases/${release.id}`}>{release.name}</Link>
              </div>
            ))}
          </div>
        )
      }
      </ContentContainer>
      <PaginationMenu
        pageNum={pageNum}
        totalPages={meta.totalPages}
        handlePageChange={handlePageChange}
        size={12} />
    </DefaultLayout>
  );
};

export default ReleasesIndex;
