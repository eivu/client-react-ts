import { AudioPlayButton } from "./AudioPlayButton";
import { AudioPauseButton } from "./AudioPauseButton";
import { useAppContext } from '../store/AppContext';
import { useMediaState } from '@vidstack/react';

export const AVButton:FC = ({item}) => {
  const { player, queue } = useAppContext();
  const isPlaying = useMediaState('playing', player);

  function nowPlayingMd5() {
    return queue.length > 0 ? queue[0].md5 : undefined;
  }

  return (
    <div>
      { item.contentType.includes('audio')
          ? (isPlaying && nowPlayingMd5() === item.md5 ? <AudioPauseButton item={item} /> : <AudioPlayButton item={item} />)
          : (item.contentType.includes('video')
              ? <span>Video</span>
              : <span>Unknown</span>
          )
      }
    </div>
  );
}
