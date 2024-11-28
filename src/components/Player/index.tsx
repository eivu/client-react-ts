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
  const [currentTrack, setCurrentTrack] = useState<QueueItem | undefined>(undefined);
  const [markAsPlayedTimeout, setMarkAsPlayedTimeout] = useState<boolean>(false);
  const [markedTrack, setMarkedTrack] = useState<QueueItem | undefined>(undefined);
  const [trackTimer, setTrackTimer] = useState<number>(0);
  const MIN_PLAYING_DURATION:number =  2000;
  const { dispatch, queueIndex, queue } = useAppContext();
  let player = useRef<MediaPlayerInstance>(null);


  // initialize player
  useEffect(() => {
    // assign ref to player context.
    dispatch({type: 'setPlayer', player: player});
    // // set current track
    // setCurrentTrack(queue[queueIndex]);
  }, []);

  useEffect(() => {
    // set current track
    setCurrentTrack(queue[queueIndex]);
  }, [queueIndex]);

  // useEffect(() => {
  //   setMarkedTrack(currentQueueItem());
  // }, [currentQueueItem()]);

  function nextQueueItem():QueueItem | undefined {
    // setCurrentTrack(queue[queueIndex + 1])
    return queue[queueIndex + 1];
  }

  function currentQueueItem():QueueItem {
    return queue[queueIndex];
  }

  function currentPlayerSrc():PlayerSrc {
    return {src: currentQueueItem().url, type: currentQueueItem().contentType }; 
  }

  function setTimer():void {
    console.log('tracking', currentTrack?.name);
    setTrackTimer(setTimeout(updateServerStats, MIN_PLAYING_DURATION));
    // playerTimeout = 
    // console.log('setTimer c:', currentQueueItem().name);
    // console.log('setTimer m:', markedTrack?.name);

    // console.log('onPlay', currentQueueItem().name);
  }

  function onSeeked():void {
    console.log('onSeeked', currentTrack?.name);
    console.log('trackTimer', trackTimer);
    clearTimeout(trackTimer);
    setTimer();
    // playerTimeout = setTimeout(updateServerStats, MIN_PLAYING_DURATION);
    // setMarkedTrack(currentQueueItem());
    // console.log('onSeeked', currentQueueItem().name);
    // alert("found onSeeked");
    // clearTimeout(playerTimeout);
  }

  function updateServerStats():void {
    // alert('updateServerStats');
    if (!markAsPlayedTimeout) {
      console.log('updateServerStats: cq', currentQueueItem().name);
      // console.log('updateServerStats: marked', markedTrack?.name);

      clearTimeout(trackTimer);
      setMarkAsPlayedTimeout(true);
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent):void {
    player && player!.current.play();
  }

  function onEnded():void {
    // play next item in queue if it exists.
    // setMarkedTrack(nextQueueItem());
    // console.log('onEnded', markedTrack?.name);
    // resetMarkAsPlayedTimeout() && nextQueueItem() && dispatch({type: 'incrementQueueIndex'});
    clearTimeout(trackTimer)
    resetMarkAsPlayedTimeout() && dispatch({type: 'incrementQueueIndex'});
    // console.log('onEnded', currentQueueItem().name);
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
      // onPlaying={() => {

      //   setMarkedTrack(currentQueueItem())
      //   console.log('onPlaying c:', currentQueueItem().name, ' m:', markedTrack?.name);
      // }}
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
