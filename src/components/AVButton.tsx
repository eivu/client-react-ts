import { PlayButton } from "./PlayButton";
import { PauseButton } from "./PauseButton";
import { useAppContext } from '../store/AppContext';
import { useMediaStore, useMediaState } from '@vidstack/react';

export const AVButton:FC = ({item}) => {
  const { player, queue } = useAppContext();
  const isPlaying = useMediaState('playing', player);

  function nowPlayingMd5() {
    return queue.length > 0 ? queue[0].md5 : undefined;
  }

  return (
    <div>
      {isPlaying && nowPlayingMd5() === item.md5 ? <PauseButton item={item} /> : <PlayButton item={item} />}
    </div>
  );
}