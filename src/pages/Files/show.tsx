import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { DefaultContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
import getPaginationItems from '../../common/getPaginationItems';
// import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import { CloudFile } from '../../types/cloudFile';
import { MiniLoader } from '../../components/Loader';



const File: React.FC = () => {
  const file:CloudFile  = useLoaderData();
  const topRowKeyClassNames   = "py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap border-slate-100 dark:border-slate-400/10"
  const keyClassNames   = topRowKeyClassNames.concat(" border-t")
  const topRowvalueClassNames = "break-words py-2 pl-2 font-mono text-xs leading-6 whitespace-pre border-slate-100 dark:border-slate-400/10 text-wrap"
  const valueClassNames = topRowvalueClassNames.concat(" border-t")

  // const [loading, setLoading] = useState<boolean>(true);
  // const [responseError, setResponseError] = useState<String | undefined>(undefined);
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // // From queue page
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Eivu::File Details</h2>
      </div>



      <DefaultContainer>
        <table id="file-details-table" className="w-full text-left border-collapse">
          <tbody className="align-baseline">
            <tr>
              <td className={topRowKeyClassNames}>
                Name
              </td>
              <td className={topRowvalueClassNames}>
                {file.name}
              </td>
            </tr>
            {
              file.artists.length > 0 &&
                <tr>
                  <td className={keyClassNames}>
                    Artist(s)
                  </td>
                  <td className={valueClassNames}>
                    {file.artists.map(artist => <Link to={`/artists/${artist.id}`}>{artist.name}</Link>)}
                  </td>
                </tr>
            }
            {
              file.releases.length > 0 &&
                <tr>
                  <td className={keyClassNames}>
                    Artist(s)
                  </td>
                  <td className={valueClassNames}>
                    {file.releases.map(release => <Link to={`/releases/${release.id}`}>{release.name}</Link>)}
                  </td>
                </tr>
            }
            <tr>
              <td className={keyClassNames}>
                Acoustid Fingerprint
              </td>
              <td className={valueClassNames}>
                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
              </td>
            </tr>
          </tbody>
        </table>


<div className="break-words"> This div contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.
  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
</div>


            <dl>
              <dt>Name</dt>
              <dd>{file.name}</dd>
              <dt>Asset</dt>
              <dd>{file.asset}</dd>
            </dl>
      </DefaultContainer>
    </DefaultLayout>
  );
};

export default File;
