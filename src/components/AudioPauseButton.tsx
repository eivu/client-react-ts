import { FC } from 'react';
import { useState } from 'react';
import { RiPauseCircleLine, RiPauseCircleFill } from "react-icons/ri";
import { useAppContext } from '@src/store/AppContext';

export type AudioPauseButtonProps = {
  size?: number;
}

const AudioPauseButton: FC = ({size=32}:AudioPauseButtonProps) => {
  const [hover, setHover] = useState(false);
  const { player } = useAppContext();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => player!.current.pause()}
    >
      {hover ? <RiPauseCircleLine size={size} className='cursor-pointer'/> : <RiPauseCircleFill size={size} className='cursor-pointer'/>}  
    </div>
  );
}

export default AudioPauseButton;