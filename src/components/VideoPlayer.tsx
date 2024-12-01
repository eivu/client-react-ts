import { useState } from 'react';
import { VideoLayout } from './Player/layouts/video-layout';
import { defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { QueueItem } from "../types/queueItem";
import { ACTIVE_DEBUGGING, TRACKING_DURATION } from '../constants';

import api from '../services/api.config';
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  // Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
} from '@vidstack/react';


export type VideoPlayerProps = {
  item: QueueItem;
  player: MediaPlayerInstance;
}


export const VideoPlayer:ReactElement = ({item, player}:VideoPlayerProps) => {
  // const [trackTimer, setTrackTimer] = useState<number>(0);

  // const [unmarkedTrack, setUnmarkedTrack] = useState<boolean>(true);
  let trackTimer:any = undefined;
  let unmarkedTrack:boolean = true;

  function setTimer():void {
    ACTIVE_DEBUGGING && console.log('video player tracking', item.name);
    // only set timer if track is not marked as played.
    if (unmarkedTrack) {
      trackTimer = setTimeout(updateServerStats, TRACKING_DURATION);
    }
  }

  function onSeeked():void {
    clearTimeout(trackTimer);
    setTimer();
  }

  function updateServerStats():void {
    if (unmarkedTrack) {
      ACTIVE_DEBUGGING && console.log('video player updateServerStats: item', item.name);

      api.post(`/cloud_files/${item.md5}/update_stats`)
        .then((response) => {
          console.log('video player track stats updated', response);
        }).catch((error) => {
          console.log('video player error occured while trying to update track stats', error);
        })

      clearTimeout(trackTimer);
      unmarkedTrack = false;
    }
  }

  function resetTimer():boolean {
    clearTimeout(trackTimer)
    unmarkedTrack = true;
    return true;
  }


  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }


  return (
    <MediaPlayer
      className="player"
      title={item.name}
      src={`${item.url}?rando=${Math.random()}`} // gets around CORS issue
      crossOrigin
      playsInline
      onEnded={resetTimer}
      onCanPlay={onCanPlay}
      onPlay={setTimer}
      onSeeked={onSeeked}
      ref={player}
    >
      <MediaProvider>
        {/* <Poster
          className="vds-poster"
          src="/eivu008.png"
          // src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt={item.name}
        /> */}
        {/* {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))} */}
      </MediaProvider>

      {/* Layouts */}
      {/* <VideoLayout /> */}
      <VideoLayout icons={defaultLayoutIcons}  />
      {/* <DefaultVideoLayout
        icons={defaultLayoutIcons}
        // thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
      /> */}
    </MediaPlayer>
  )
}