import './player.css';
import { ReactElement, useEffect, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import {
  MediaPlayer,
  MediaProvider,
  // Track,
  type MediaPlayerInstance,
} from '@vidstack/react';

import * as Buttons from './layouts/shared/buttons';

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

// import { textTracks } from './tracks';
import { type QueueItem } from '../../types/queueItem';
import { AudioLayout } from './layouts/audio-layout';

export function Player():ReactElement {
  const { dispatch, queueIndex, queue } = useAppContext();
  let player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // assign ref to player context.
    dispatch({type: 'setPlayer', player: player});
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      // console.log('is audio view?', '->', viewType === 'audio');
    });
  }, []);

  function nextQueueItem():QueueItem | undefined {
    return queue[queueIndex + 1];
  }

  function currentQueueItem():QueueItem {
    return queue[queueIndex];
  }

  function currentPlayerSrc():PlayerSrc {
    return {src: currentQueueItem().url, type: currentQueueItem().contentType }; 
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    player && player!.current.play();
  }

  function onEnded():void {
    // play next item in queue if it exists.
    nextQueueItem() && dispatch({type: 'incrementQueueIndex'})
  }

  return (
    <MediaPlayer
      className="player"
      title={currentQueueItem().name}
      src={currentPlayerSrc}
      onCanPlay={onCanPlay}
      // onEnded={() => alert('Media ended')}
      onEnded={onEnded}
      crossOrigin
      playsInline
      ref={player}
    >
      <MediaProvider>
        {/* {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))} */}
      </MediaProvider>

      {/* Layouts */}
      <DefaultAudioLayout icons={defaultLayoutIcons} 
        slots={{ 
          beforeSeekBackwardButton: <Buttons.Prev tooltipPlacement="top" />,
          afterSeekForwardButton: <Buttons.Next tooltipPlacement="top" />
        }}
      />
    

    </MediaPlayer>
  );
}
