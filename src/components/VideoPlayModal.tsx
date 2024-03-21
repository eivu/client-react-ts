

import { TfiClose } from "react-icons/tfi";
import React, { useState, useEffect, useRef } from 'react';
import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { QueueItem } from '../types/queueItem';
import { VideoLayout } from './Player/layouts/video-layout';


import {
  MediaPlayer,
  MediaProvider,
  Poster,
  // Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { V } from "@vidstack/react/dist/types/vidstack-framework.js";

// import { textTracks } from './Player/tracks';





const VideoPlayModal: React.FC = ({item}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const player = useRef<MediaPlayerInstance>(null);
  const trigger = useRef<any>(null);
  const modal = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      closeModal();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      closeModal();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  function openModal() {
    setModalOpen(!modalOpen);
    // player!.current!.play();
  }

  function closeModal() {
    setModalOpen(false);
    player!.current!.pause();
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }

  return (
    <div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={trigger}
        onClick={() => openModal()}
      >
        {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
      </div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          // onBlur={() => closeModal()}
          className="w-full max-w-142.5 rounded-lg bg-white text-center dark:bg-boxdark"
        >
          <div onClick={() => closeModal()} className='p-2 cursor-pointer float-right'>
            <TfiClose />
          </div>
          <div className='md:px-17.5 px-8 py-12 md:py-15 clear-both'>
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
                <Poster
                  className="vds-poster"
                  src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
                  alt={item.name}
                />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayModal;
