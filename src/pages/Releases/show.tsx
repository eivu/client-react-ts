import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
import { useState, useEffect} from 'react';
import type { Release } from '../../types/release';
import { MiniLoader } from '../../components/Loader';
import api from '../../services/api.config';
import { ReleaseTable } from '../../components/ReleaseTable';
import { ErrorPanel } from '../../components/ErrorPanel';

const ReleasePage: React.FC = () => {
  const releaseId = useLoaderData();
  const [loading, setLoading] = useState<boolean>(true);
  const [release, setRelease] = useState<Release>();
  const [responseError, setResponseError] = useState<string>('');
  const { activeCategory } = useAppContext();

  useEffect(() => {
    setLoading(true);
    api.get(`/releases/${releaseId}`, {
      params: { category: activeCategory, delicate: false }}
    ).then((response) => {
      console.log(response.data)
      setRelease(response.data.release);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  },[activeCategory])

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
              responseError ? 'Err0r' :
                release?.secured ? `Release ${release?.id
              }` : release?.name}</span>
            {
              release?.artists.length > 0 &&
                <div>
                  {/* BY */}
                  { release.artists.map((artist) => {
                    return (
                      <Link to={`/artists/${artist.id}`} className="pr-2">{artist.name}</Link>
                    )})
                   }
                </div>
            }
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
