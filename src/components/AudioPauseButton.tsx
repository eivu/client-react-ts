import { useState } from 'react';
import { RiPauseCircleLine, RiPauseCircleFill } from "react-icons/ri";
import { useAppContext } from '../store/AppContext';

const AudioPauseButton: FC = () => {
  const [hover, setHover] = useState(false);
  const { player } = useAppContext();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => player!.current.pause()}
    >
      {hover ? <RiPauseCircleLine size={32} className='cursor-pointer'/> : <RiPauseCircleFill size={32} className='cursor-pointer'/>}  
    </div>
  );
}

export default AudioPauseButton;