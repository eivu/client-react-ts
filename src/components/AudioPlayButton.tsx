import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useState } from 'react';
import { currentQueueItemMd5, useAppContext } from '../store/AppContext';

const AudioPlayButton:FC = ({item}) => {
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
    else
      dispatch({type: 'setQueue', queue: [item]});
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick()}
    >
      {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
    </div>
  );
}

export default AudioPlayButton;