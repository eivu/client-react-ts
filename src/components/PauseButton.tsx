import { useState } from 'react';
import { RiPauseCircleLine, RiPauseCircleFill } from "react-icons/ri";


export const PauseButton: FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <RiPauseCircleFill size={32} className='cursor-pointer'/> : <RiPauseCircleLine size={32} className='cursor-pointer'/>}  
    </div>
  );
}