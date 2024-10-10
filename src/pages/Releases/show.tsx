// http://localhost:5173/releases/71
// http://localhost:5173/releases/427


import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
// import axios from 'axios';
import type { Release } from '../../types/release';
import { MiniLoader } from '../../components/Loader';

import { ReleaseTable } from '../../components/ReleaseTable';


const ReleasePage: React.FC = () => {
  const release:Release  = useLoaderData()<Release>;

  // const [loading, setLoading] = useState<boolean>(true);
  // const [responseError, setResponseError] = useState<String | undefined>(undefined);
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // // From queue page
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  return (
    <DefaultLayout>
      {
        release.artworkUrl && (
          <div className="flex justify-left">
            <img src={release.artworkUrl} alt={release.name} className="w-64 h-64" />
          </div>
        )
      }
      <ContentHeader>::
        <Link to="/releases" className="breadcrumb">Release</Link>::{release.secured ? `Release ${release.id}` : release.name}
      </ContentHeader>
      <ContentContainer>
        <ReleaseTable release={release} />
      </ContentContainer>
    </DefaultLayout>
  );
};

export default ReleasePage;
