import { useState } from 'react';
import { RiPauseCircleLine, RiPauseCircleFill } from "react-icons/ri";
import { useAppContext } from '../store/AppContext';

export const AudioPauseButton: FC = () => {
  const [hover, setHover] = useState(false);
  const { player } = useAppContext();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => player!.current.pause()}
    >
      {hover ? <RiPauseCircleFill size={32} className='cursor-pointer'/> : <RiPauseCircleLine size={32} className='cursor-pointer'/>}  
    </div>
  );
}