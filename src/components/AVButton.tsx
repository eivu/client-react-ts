import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { PlayButtonSimple } from "./PlayButtonSimple";
import { PauseButton } from "./PauseButton";
import { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import {
  useMediaPlayer, useMediaStore, MediaPlayer, useMediaRemote, MediaPlayerInstance,
  useMediaState,
  type MediaRemoteControl
} from '@vidstack/react';



export const AVButton:FC = ({item}) => {
  const { player, queue, dispatch } = useAppContext();
  const [hover, setHover] = useState(false);
  // https://www.vidstack.io/docs/player/components/core/player?styling=css#mediaplayer.state

  useEffect(() => {
    console.log(playing)
  //   // console.log('player', player);
  //   // console.log('source', src);
  //   console.log('item', item);
  }, []);


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
    // console.log("paused", paused);
    // player!.current.play();
  }

  function nowPlayingMd5() {
    return queue.length > 0 ? queue[0].md5 : undefined;
  }

  return (
    <div onClick={() => assignSrc()}>
      <>
      {playing && nowPlayingMd5() === item.md5 ? <PauseButton /> : <PlayButtonSimple />}
      </>
    </div>
  );
}