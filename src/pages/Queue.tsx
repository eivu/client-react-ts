import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useAppContext } from '../store/AppContext';

const Queue: React.FC = () => {
  const { queue } = useAppContext();
  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Queue</h2>
      </div>

      <div className="flex flex-col gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 sm:p-6 xl:p-9">
            <ol>
              {
                queue.map((item, index) => (
                  <li>{item.name} - 0:00</li>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Queue;
