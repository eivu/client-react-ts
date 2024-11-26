import './player.css';
import { ReactElement, useEffect, useState, useRef } from 'react';
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
  let playerTimeout:number;
  const [markAsPlayedTimeout, setMarkAsPlayedTimeout] = useState<boolean>(false);
  const MIN_PLAYING_DURATION:number =  1000;
  const { dispatch, queueIndex, queue } = useAppContext();
  let player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // assign ref to player context.
    dispatch({type: 'setPlayer', player: player});
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

  function setTimer():void {
    playerTimeout = setTimeout(updateServerStats, MIN_PLAYING_DURATION);
    console.log('onPlay', currentQueueItem().name);
  }

  function onSeeked():void {
    clearTimeout(playerTimeout);
    playerTimeout = setTimeout(updateServerStats, MIN_PLAYING_DURATION);
    console.log('onSeeked', currentQueueItem().name);
    // alert("found onSeeked");
    // clearTimeout(playerTimeout);
  }

  function updateServerStats():void {
    // alert('updateServerStats');
    if (!markAsPlayedTimeout) {
      console.log('updateServerStats', currentQueueItem().name);
      clearTimeout(playerTimeout);
      setMarkAsPlayedTimeout(true);
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent):void {
    player && player!.current.play();
  }

  function onEnded():void {
    // play next item in queue if it exists.
    resetMarkAsPlayedTimeout() && nextQueueItem() && dispatch({type: 'incrementQueueIndex'});
  }

  function resetMarkAsPlayedTimeout():boolean {
    setMarkAsPlayedTimeout(false);
    return true;
  }

  return (
    <MediaPlayer
      className="player"
      title={currentQueueItem().name}
      src={currentPlayerSrc}
      onCanPlay={onCanPlay}
      onPlay={setTimer}
      onSeeked={onSeeked}
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
