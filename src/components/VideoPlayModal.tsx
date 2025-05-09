import React, { useState, useEffect, useRef } from 'react';
import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";
import { useAppContext } from '@src/store/AppContext';
import { QueueItem } from '@src/types/queueItem';
import { VideoPlayer } from './VideoPlayer';

const VideoPlayModal: React.FC = ({item}) => {
  const { player:audioPlayer } = useAppContext();
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
    audioPlayer!.current.pause()
  }

  function closeModal() {
    setModalOpen(false);
    player!.current!.pause();
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
            <VideoPlayer item={item} player={player} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayModal;
