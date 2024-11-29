import { VideoLayout } from './Player/layouts/video-layout';
import { defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { QueueItem } from "../types/queueItem";
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


export function VideoPlayer({item, player}:VideoPlayerProps):ReactElement {



  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }


  return (
    <MediaPlayer
      className="player"
      title={item.name}
      src={item.url}
      crossOrigin
      playsInline
      onCanPlay={onCanPlay}
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