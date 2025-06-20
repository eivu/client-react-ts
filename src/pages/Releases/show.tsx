import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import { useAppContext } from '@src/store/AppContext';
import { useState, useEffect, FC } from 'react';
import type { Release } from '@src/types/release';
import { MiniLoader } from '@src/components/Loader';
import api from '@src/services/api.config';
import { ReleaseTable } from '@src/components/ReleaseTable';
import { ErrorPanel } from '@src/components/ErrorPanel';
import { CollectionControls } from '@src/components/CollectionControls';


const ReleasePage: React.FC = () => {
  const titlePrefix = "EIVU::Releases::";
  const releaseId = useLoaderData();
  const [title, setTitle] = useState<string | undefined>("Loading...");
  const [loading, setLoading] = useState<boolean>(true);
  const [release, setRelease] = useState<Release>();
  const [responseError, setResponseError] = useState<string>('');
  const { activeCategory } = useAppContext();

  useEffect(() => {
    setTitle(responseError ? 'Err0r' :
      release?.secured ?
        `Release ${release?.id}` : release?.name);
    document.title = titlePrefix + title;
  }, [release])

  useEffect(() => {
    setLoading(true);
    api.get(`/releases/${releaseId}`, {
      params: { category: activeCategory, delicate: false }
    }
    ).then((response) => {
      console.log(response.data)
      setRelease(response.data.release);
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
        release?.artworkUrl && (
          <div className="flex justify-left">
            <img src={release?.artworkUrl} alt={release?.name} className="w-64 h-64" />
          </div>
        )
      }
      {
        !loading && (
          <ContentHeader>::
            <span><Link to="/releases" className="breadcrumb">Release</Link>::{
              responseError ? 'Err0r' : release?.name
            }</span>
            {
              release?.artists?.length > 0 &&
              <div>
                {/* BY */}
                {release.artists.map((artist) => {
                  return (
                    <Link to={`/artists/${artist.id}`} className="pr-2" key={`artist-link-${artist.id}`}>{artist.name}</Link>
                  )
                })
                }
              </div>
            }
            {release && <CollectionControls collection={release} />}
          </ContentHeader>
        )
      }
      <ContentContainer>
        {
          loading ? <MiniLoader /> :
            responseError ? <ErrorPanel errorMessage={responseError} /> : <ReleaseTable release={release} />
        }
      </ContentContainer>
    </DefaultLayout>
  );
};

export default ReleasePage;
