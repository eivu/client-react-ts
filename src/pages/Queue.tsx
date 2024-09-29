import React from 'react';
import DefaultLayout, { ContentHeader, ContentContainer} from '../layout/DefaultLayout';
import { useAppContext } from '../store/AppContext';
import { useMediaState } from '@vidstack/react';
import convertSecondsToTimeHhMmSs from '../common/convertSecondsToTimeHhMmSs';
import { Link } from 'react-router-dom';

const Queue: React.FC = () => {
  const { queue, queueIndex, player, dispatch } = useAppContext();
  const isPlaying = useMediaState('playing', player);
  return (
    <DefaultLayout>
      <ContentHeader>Eivu::Queue</ContentHeader>
      <ContentContainer>
        <div id="queue-wrapper">
          {queue.map((item, index) => (
            <div key={index}
              onClick={() => index != queueIndex && dispatch({ type: 'setQueueIndex', queueIndex: index })}
              // investigate classNames library for dynamic assignment of css classes
              className={
                (
                  index == queueIndex
                    ? (isPlaying ? 'currentIten playing' : 'currentIten paused')
                    : 'otherItem'
                )
                + ' queueRow grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark'}>
              <div className="col-span-1">
                <p className="font-medium">{index + 1}</p>
              </div>
              <div className="col-span-9">
                <p className="font-medium">
                  <Link to={`/files/${item.md5}`}>{item.name}</Link>
                </p>
              </div>
              <div className="col-span-1 text-right">
                <p className="font-medium">{convertSecondsToTimeHhMmSs(item.duration)}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};

export default Queue;
