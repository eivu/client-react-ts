import { FC } from 'react';
import type { Release } from '@src/types/release';
import { QueueItem } from "@src/types/queueItem";
import { objectToQueueItem } from "@src/common/objectToQueueItem";
import { useAppContext } from '@src/store/AppContext';



export const ReleaseControls: JSX.Element = ({release}:{release: Release}) => {
  const tracks:QueueItem[] = release.tracks.map((track) => { return objectToQueueItem(track)})
  const { dispatch, player } = useAppContext();


  function playAll(release: Release) {
      dispatch({type: 'setQueueIndex', queueIndex: 0})
      dispatch({type: 'setQueue', queue: tracks});
      player!.current.play();


    // dispatch({type: 'insertMultiQueueItems', queueItems: tracks })
  }

  function addAllToQueue(release: Release) {
    const tracks:QueueItem[] = release.tracks.map((track) => { return objectToQueueItem(track)})
    dispatch({type: 'addMultiQueueItems', queueItems: tracks })
  }



  return (
    <div className="album-controls">
      <span className='album-controls-inner-wrapper'>
        <button className="album-control pr-2" onClick={() => playAll(release)}>Play All</button>
        <span className='spacer'>|</span>
        <button className="album-control pl-2" onClick={() => addAllToQueue(release)}>Add All</button>
      </span>
    </div>
  );
}