import { FC } from 'react';
import type { Release } from '../types/release';
import { QueueItem } from "../types/queueItem";
import { objectToQueueItem } from "../common/objectToQueueItem";
import { useAppContext } from '../store/AppContext';



export const AlbumControls: JSX.Element = ({release}:{release: Release}) => {
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
      <span className="album-control" onClick={() => playAll(release)}>Play All</span>
      |
      <span className="album-control" onClick={() => addAllToQueue(release)}>Add All</span>
    </div>
  );
}