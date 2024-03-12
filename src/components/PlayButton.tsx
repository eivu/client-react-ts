import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import { useMediaStore } from '@vidstack/react';



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

  function assignSrc():void {
    dispatch({type: 'setQueue', queue: [item]});
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