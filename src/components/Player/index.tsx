import './player.css';
import { ReactElement, useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import { ACTIVE_DEBUGGING, INTRO_TRACK_MD5, TRACKING_DURATION } from '../../constants';
import {
  MediaPlayer,
  MediaProvider,
  // Track,
  type MediaPlayerInstance,
} from '@vidstack/react';

import * as Buttons from './layouts/shared/buttons';
import api from '../../services/api.config';

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

// import { textTracks } from './tracks';
import { type QueueItem } from '../../types/queueItem';

export function Player():ReactElement {
  const [currentTrack, setCurrentTrack] = useState<QueueItem | undefined>(undefined);
  const [unmarkedTrack, setUnmarkedTrack] = useState<boolean>(true);
  const [trackTimer, setTrackTimer] = useState<number>(0);
  const { dispatch, queueIndex, queue } = useAppContext();
  let player = useRef<MediaPlayerInstance>(null);


  // initialize player
  useEffect(() => {
    // assign ref to player context.
    dispatch({type: 'setPlayer', player: player});
  }, []);

  useEffect(() => {
    // set current track when queue index changes.
    setCurrentTrack(queue[queueIndex]);
  }, [queueIndex]);


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
    ACTIVE_DEBUGGING && console.log('audio player tracking', currentTrack?.name);
    // only set timer if track is not marked as played.
    unmarkedTrack && setTrackTimer(setTimeout(updateServerStats, TRACKING_DURATION));
  }

  function onSeeked():void {
    clearTimeout(trackTimer);
    setTimer();
  }

  function updateServerStats():void {
    if (unmarkedTrack) {
      ACTIVE_DEBUGGING && console.log('audio player updateServerStats: currentQueueItem', currentQueueItem().name);

      // make sure Whispers of Silence is never tracked
      currentTrack?.md5 != INTRO_TRACK_MD5 &&
        api.post(`/cloud_files/${currentTrack?.md5}/update_stats`)
          .then((response) => {
            ACTIVE_DEBUGGING && console.log('audio player track stats updated', response);
          }).catch((error) => {
            console.log('audio player error occured while trying to update track stats', error);
          })

      clearTimeout(trackTimer);
      setUnmarkedTrack(false);
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent):void {
    player && player!.current.play();
  }

  function onEnded():void {
    resetTimer() && nextQueueItem() && dispatch({type: 'incrementQueueIndex'});
  }

  function resetTimer():boolean {
    clearTimeout(trackTimer)
    setUnmarkedTrack(true);
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
