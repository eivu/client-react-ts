import { FC } from 'react';
import type { Release } from '@src/types/release';
import type { Playlist } from '@src/types/playlist';
import type { Track } from '@src/types/track';
import type { PlaylistItem } from '@src/types/playlistItem';
import { QueueItem } from "@src/types/queueItem";
import { objectToQueueItem } from "@src/common/objectToQueueItem";
import { useAppContext } from '@src/store/AppContext';


type CollectionControlsProps = {
  collection: Release | Playlist;
}
export const CollectionControls: FC<CollectionControlsProps> = ({ collection }) => {
  const { dispatch, player } = useAppContext();

  let items: Track[] | PlaylistItem[] = [];

  if (collection.hasOwnProperty('tracks')) {
    items = (collection as Release).tracks;
  } else if (collection.hasOwnProperty('playlistItems')) {
    items = (collection as Playlist).playlistItems;
  }
  const tracks: QueueItem[] = items.map((track) => { return objectToQueueItem(track) })


  // Adds all tracks to the next place in the queue, and plays the first queued track
  function playAll() {
    dispatch({ type: 'setQueueIndex', queueIndex: 0 })
    dispatch({ type: 'setQueue', queue: tracks });
    player!.current.play();


    // dispatch({type: 'insertMultiQueueItems', queueItems: tracks })
  }

  // Adds all tracks to the bottom of the queue
  function addAllToQueue() {
    dispatch({ type: 'addMultiQueueItems', queueItems: tracks })
  }



  return (
    <div className="album-controls">
      <span className='album-controls-inner-wrapper'>
        <button className="album-control pr-2" onClick={() => playAll()}>Play All</button>
        <span className='spacer'>|</span>
        <button className="album-control pl-2" onClick={() => addAllToQueue()}>Add All</button>
      </span>
    </div>
  );
}