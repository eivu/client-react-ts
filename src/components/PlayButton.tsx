import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useEffect, useRef, useState, useStore } from 'react';
import {
  useMediaPlayer, useMediaStore, MediaPlayer, useMediaRemote, MediaPlayerInstance,
  useMediaState,
  type MediaRemoteControl
} from '@vidstack/react';



function assignSrc(remote:MediaRemoteControl):void {
  console.log("assigning")
  const player = remote.getPlayer();
  console.log(remote);
  console.log(player);

}

export const PlayButton:FC = ({item}) => {
  const [hover, setHover] = useState(false);
  const isPlaying = useMediaState('playing');
  const remote = useMediaRemote(); // https://www.vidstack.io/docs/player/api/classes/media-remote-control?styling=default-theme

  let p = useRef<MediaPlayerInstance>(null)
  console.log(item)
  console.log(isPlaying)


  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => assignSrc(remote)}
    >
      {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
    </div>
  );
}