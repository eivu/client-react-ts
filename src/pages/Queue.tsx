import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useAppContext } from '../store/AppContext';
import { useMediaState } from '@vidstack/react';
import convertSecondsToTimeHhMmSs from '../common/convertSecondsToTimeHhMmSs';

const Queue: React.FC = () => {
  const { queue, queueIndex, player } = useAppContext();
  const isPlaying = useMediaState('playing', player);
  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Queue</h2>
      </div>

      <div className="flex flex-col gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 sm:p-6 xl:p-9">
            {queue.map((item, index) => (
              <div key={index}
                className={
                  (
                    index == queueIndex
                      ? (isPlaying ? 'bg-gray activeSelection' : 'inactiveSelection')
                      : ''
                  )
                  + ' queueRow cursor-pointer grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark'}>
                <div className="col-span-1">
                  <p className="font-medium">{index + 1}</p>
                </div>
                <div className="col-span-9">
                  <p className="font-medium">{item.name}</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className="font-medium">{convertSecondsToTimeHhMmSs(item.duration)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Queue;
