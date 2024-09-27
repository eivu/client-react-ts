import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
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



      <div className="flex flex-col gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 sm:p-6 xl:p-9">



            <div className="grid grid-flow-col gap-3">
              <div className="col-span-1 py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">
                1st col
              </div>
              <div className="col-span-4 py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">
                2nd col
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <tbody className="align-baseline">
                <tr>
                  <td className="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap dark:text-sky-400">
                    grid-cols-1
                  </td>
                  <td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300">
                    a grid with one column
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400 border-t border-slate-100 dark:border-slate-400/10">grid-cols-2</td>
                  <td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">
                    a grid with one column
                  </td>
                </tr>
              </tbody>
            </table>
            <dl>
              <dt>Name</dt>
              <dd>{file.name}</dd>
              <dt>Asset</dt>
              <dd>{file.asset}</dd>
            </dl>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default File;
