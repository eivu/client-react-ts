


import React, { useState, useEffect, useRef } from 'react';
import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { QueueItem } from '../types/queueItem';


//----------
import './Player/player.css';


import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  // Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
} from '@vidstack/react';
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import { textTracks } from './Player/tracks';





const VideoPlayModal: React.FC = ({item}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const player = useRef<MediaPlayerInstance>(null);

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

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
      setModalOpen(false);
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

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
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
          // onBlur={() => setModalOpen(false)}
          className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:py-15"
        >
          <h1>Content here</h1>
          <div onClick={() => closeModal()} className='cursor-pointer'>X</div>
          <MediaPlayer
            className="player"
            title={item.name}
            src={item.url}
            crossOrigin
            playsInline
            onCanPlay={onCanPlay}
            onProviderChange={onProviderChange}
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
            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout
              icons={defaultLayoutIcons}
              // thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
            />
          </MediaPlayer>

          {/* <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
            Your Message Sent Successfully
          </h3>
          <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
          <p className="mb-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since
          </p>
          <div className="-mx-3 flex flex-wrap gap-y-4">
            <div className="2xsm:w-1/2 w-full px-3">
              <button
                onClick={() => setModalOpen(false)}
                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
              >
                Close
              </button>
            </div>
            <div className="2xsm:w-1/2 w-full px-3">
              <button className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                View Details
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayModal;