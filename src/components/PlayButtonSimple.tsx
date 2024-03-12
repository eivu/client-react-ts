import { useState } from 'react';
import { PiPlayCircleLight, PiPlayCircleFill } from "react-icons/pi";



export const PlayButtonSimple: FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <PiPlayCircleFill size={32} className='cursor-pointer'/> : <PiPlayCircleLight size={32} className='cursor-pointer'/>}  
    </div>
  );
}