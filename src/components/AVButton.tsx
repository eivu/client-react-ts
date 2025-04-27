import { FC } from 'react';
import AudioPlayButton from "./AudioPlayButton";
import AudioPauseButton from "./AudioPauseButton";
import { useAppContext } from '@src/store/AppContext';
import { useMediaState } from '@vidstack/react';
import VideoPlayModal from './VideoPlayModal';
import { QueueItem } from "@src/types/queueItem";
import { Link } from 'react-router-dom';

export type AVButtonProps = {
  item: QueueItem;
  size?: number;
}

const AVButton:FC = ({item, size=32}:AVButtonProps) => {
  const { player, queue, queueIndex } = useAppContext();
  const isPlaying = useMediaState('playing', player);

  function nowPlayingMd5() {
    return queue.length > 0 ? queue[queueIndex].md5 : undefined;
  }

  return (
    <div className='float-left'>
      { item.contentType
          ?
            item.contentType?.includes('audio')
              ? (isPlaying && nowPlayingMd5() === item.md5
                ? <AudioPauseButton item={item} size={size} />
                : <AudioPlayButton item={item} size={size} />)
              : (item.contentType.includes('video')
                  ? <VideoPlayModal item={item} />
                  : <Link to={`/files/${item.md5}`} className="break-normal">View</Link>
              )
          : <span>?</span>
      }
    </div>
  );
}

export default AVButton;