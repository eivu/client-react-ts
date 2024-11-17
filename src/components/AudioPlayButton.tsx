import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useState } from 'react';
import { currentQueueItemMd5, useAppContext } from '../store/AppContext';
import { QueueItem } from "../types/queueItem";

export type AudioPlayButtonProps = {
  item: QueueItem;
  size?: number;
} 

const AudioPlayButton:FC = ({item, size=32}:AudioPlayButtonProps) => {
  const { player, queue, dispatch } = useAppContext();
  const [hover, setHover] = useState(false);
  // https://www.vidstack.io/docs/player/components/core/player?styling=css#mediaplayer.state

  // useEffect(() => {
  //   // console.log('player', player);
  //   // console.log('source', src);
  //   console.log('item', item);
  // }, []);

  function handleClick():void {
    if (currentQueueItemMd5(queue) == item.md5)
      player!.current.play();
    else {
      dispatch({type: 'setQueueIndex', queueIndex: 0})
      dispatch({type: 'setQueue', queue: [item]});
            player!.current.play();

    }
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick()}
    >
      {hover ? <PiPlayCircleFill size={size} className='cursor-pointer'/> : <PiPlayCircleLight size={size} className='cursor-pointer'/>}  
    </div>
  );
}

export default AudioPlayButton;