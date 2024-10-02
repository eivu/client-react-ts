// http://localhost:5173/releases/71
// http://localhost:5173/releases/427


import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
// import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type { Release } from '../../types/release';
import { MiniLoader } from '../../components/Loader';
import convertSecondsToTimeHhMmSs from '../../common/convertSecondsToTimeHhMmSs';



const ReleasePage: React.FC = () => {
  const release:Release  = useLoaderData();
  const topRowKeyClassNames   = "py-2 pr-2 font-mono font-medium leading-6 whitespace-nowrap border-slate-100 dark:border-slate-400/10"
  const keyClassNames   = topRowKeyClassNames.concat(" border-t")
  const topRowvalueClassNames = "break-words py-2 pl-2 font-mono leading-6 whitespace-pre border-slate-100 dark:border-slate-400/10 text-wrap"
  const valueClassNames = topRowvalueClassNames.concat(" border-t")

  // const [loading, setLoading] = useState<boolean>(true);
  // const [responseError, setResponseError] = useState<String | undefined>(undefined);
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // // From queue page
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  return (
    <DefaultLayout>
      <ContentHeader>::
        <Link to="/files" className="breadcrumb">Release</Link>::{release.secured ? `Release ${release.id}` : release.name}
      </ContentHeader>
      <ContentContainer>
        <table id="release-details-table" className="w-full text-left border-collapse">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              { release.multiBundle &&
                <td className={topRowKeyClassNames}>
                  Bundle
                </td>
      }
              <td className={topRowKeyClassNames}>
                Position
              </td>
              <td className={topRowKeyClassNames}>
                Name
              </td>
              <td className={topRowKeyClassNames}>
                Duration
              </td>
              <td className={topRowKeyClassNames}>
                Size
              </td>
              <td className={topRowKeyClassNames}>
                Rating
              </td>
              <td className={topRowKeyClassNames}>
                Plays
              </td>
            </tr>
            {release.tracks.map((track) => (
              <tr key={track.id}>
                <td>
                  {/* <AddToQueueButton track={track} /> */}
                </td>
                <td>
                  {/* <AVButton track={track} /> */}
                </td>
                { release.multiBundle &&
                  <td className={valueClassNames}>
                    {track.bundlePos}
                  </td>
                }
                <td className={valueClassNames}>
                  {track.position}
                </td>
                <td className={valueClassNames}>
                  {track.label}
                </td>
                <td className={valueClassNames}>
                  {convertSecondsToTimeHhMmSs(track.duration)}
                </td>
                <td className={valueClassNames}>
                  {prettyBytes(track.filesize)}
                </td>
                <td className={valueClassNames}>
                  { track.rating }
                </td>
                <td className={valueClassNames}>
                  { track.numPlays }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentContainer>
    </DefaultLayout>
  );
};

export default ReleasePage;
