import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import {
  useMediaPlayer, useMediaStore, MediaPlayer, useMediaRemote, MediaPlayerInstance,
  useMediaState,
  type MediaRemoteControl
} from '@vidstack/react';



export const PlayButton:FC = ({item}) => {
  const { player, queue, dispatch } = useAppContext();
  const [hover, setHover] = useState(false);
  // https://www.vidstack.io/docs/player/components/core/player?styling=css#mediaplayer.state

  // useEffect(() => {
  //   // console.log('player', player);
  //   // console.log('source', src);
  //   console.log('item', item);
  // }, []);


  const { playing } = useMediaStore(player);



  // const isPlaying = useMediaState('playing', player);
  // const remote = useMediaRemote(); // https://www.vidstack.io/docs/player/api/classes/media-remote-control?styling=default-theme

  // let p = useRef<MediaPlayerInstance>(null)
  // console.log(item)
  // console.log(isPlaying)

  // function assignSrc(remote:MediaRemoteControl):void {
  function assignSrc():void {
    dispatch({type: 'setQueue', queue: [item]});
    // console.log('nowPlayingMd5', nowPlayingMd5());
    console.log("paused", paused);
    // player!.current.play();
  }

  function nowPlayingMd5() {
    return queue.length > 0 ? queue[0].md5 : undefined;
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => assignSrc()}
    >
      {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
    </div>
  );
}