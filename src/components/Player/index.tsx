import './player.css';
import { ReactElement, useEffect, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  // Track,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { AudioLayout } from './layouts/audio-layout';

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';


import { DefaultAirPlayButton, DefaultGoogleCastButton } from '@vidstack/react/player/layouts/default';
// import {
//   DefaultAirPlayButton,
//   defaultLayoutIcons,
// } from '@vidstack/react/player/layouts/default';

import * as Buttons from './layouts/shared/buttons';

// import { textTracks } from './tracks';
import { QueueItem } from '../../types/queueItem';

export function Player():ReactElement {
  const { dispatch, queueItem, queue } = useAppContext();
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


  function queueObjects(): PlayerSrc[] {
    return queue.map((item:QueueItem) => ({src: item.url, type: item.contentType }));
  }

  return (
    <MediaPlayer
      className="player"
      title={queueItem.name}
      src={queueObjects}
      autoPlay
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
      <DefaultAudioLayout
      icons={defaultLayoutIcons}
      
      slots={{
    // beforePlayButton: null,
    // Accepts a `ReactNode`, setting the slot to `null` will remove it.
    // playButton: Buttons.Play({ tooltipPlacement: 'top' }),
    // afterPlayButton: null,
    airPlayButton: Buttons.AirPlay({ tooltipPlacement: 'top' }),
    // 72 other slots positions...
  }}

      
      />
      {/* <AudioLayout /> */}
    </MediaPlayer>
  );
}
