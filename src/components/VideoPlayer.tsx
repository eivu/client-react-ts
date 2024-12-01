import { useState } from 'react';
import { VideoLayout } from './Player/layouts/video-layout';
import { defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { QueueItem } from "../types/queueItem";
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
  const MIN_PLAYING_DURATION:number =  1000;
  let trackTimer:any = undefined;
  let unmarkedTrack:boolean = true;

  function setTimer():void {
    // console.log('tracking', item.name);
    // let x = setTimeout(updateServerStats, MIN_PLAYING_DURATION)
    // only set timer if track is not marked as played.
    if (unmarkedTrack) {
      trackTimer = setTimeout(updateServerStats, MIN_PLAYING_DURATION);
    }
      // const x:number = setTimeout(updateServerStats, MIN_PLAYING_DURATION)
      // setTrackTimer(x);
    // );
  }

  function onSeeked():void {
    clearTimeout(trackTimer);
    setTimer();
  }

  function updateServerStats():void {
    if (unmarkedTrack) {
      console.log('updateServerStats: item', item.name);

      // make sure Whispers of Silence is never tracked
      // currentTrack?.md5 != "D258C1A40E785406564616AFD8045351" &&
      api.post(`/cloud_files/${item.md5}/update_stats`)
        .then((response) => {
          console.log('track stats updated', response);
        }).catch((error) => {
          console.log('error occured while trying to update track stats', error);
        })

      clearTimeout(trackTimer);
      unmarkedTrack = false;
    }
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