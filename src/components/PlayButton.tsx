import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import {
  useMediaPlayer, useMediaStore, MediaPlayer, useMediaRemote, MediaPlayerInstance,
  useMediaState,
  type MediaRemoteControl
} from '@vidstack/react';



export const PlayButton:FC = ({item}) => {
  const { player, dispatch } = useAppContext();
  const [hover, setHover] = useState(false);
  // const isPlaying = useMediaState('playing');
  // const remote = useMediaRemote(); // https://www.vidstack.io/docs/player/api/classes/media-remote-control?styling=default-theme

  // let p = useRef<MediaPlayerInstance>(null)
  // console.log(item)
  // console.log(isPlaying)

// function assignSrc(remote:MediaRemoteControl):void {
function assignSrc(remote:number):void {
  console.log("assigning");
  console.log(player);
  // player?.setSrc(`https://stream.mux.com/${remote}/low.mp4`);
  player!.current.src = 'https://eivu.s3.amazonaws.com/welcome.mp3';
  player!.current.play();
  dispatch({type: 'addNumber', number: remote + 990000000})
  // const player = remote.getPlayer();
  // console.log(remote);
  // console.log(player);

}

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => assignSrc(Math.random())}
    >
      {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
    </div>
  );
}