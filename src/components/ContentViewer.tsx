import { JSX, useEffect, useState } from 'react';
import { CloudFile } from '../types/cloudFile';
import { objectToQueueItem } from '../common/objectToQueueItem';
import AVButton from './AVButton';
import AddToQueueButton from './AddToQueueButton';
import axios from 'axios';
import { GoCloudOffline } from "react-icons/go";
import { IoIosHourglass } from "react-icons/io";
import { VideoPlayer } from './VideoPlayer';
import { ArcadePlayer } from './ArcadePlayer';
import { ACTIVE_DEBUGGING, TRACKING_DURATION } from '../constants';
import api from '../services/api.config';

export type ViewerProps = {
  file: CloudFile;
}

export const ContentViewer:JSX.Element = ({file}:ViewerProps) => {
  const [online, setOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    file &&
      axios.head(`${file.url}?rando=${Math.random()}`)
           .then((response) => {
             if (response.status === 200) {
               setOnline(true);
             } else {
               setLoading(false);
             }
             setLoading(false);
           }).catch(() => {
             setOnline(false);
             setLoading(false);
           });

    const timeoutId = setTimeout(() => {
      // don't update stats for audio and video files
      !file.contentType.startsWith('audio') && !file.contentType.startsWith('video') &&
        api.post(`/cloud_files/${file.md5}/update_stats`)
          .then((response) => {
            ACTIVE_DEBUGGING && console.log(`${file.name} stats updated`, response);
          }).catch((error) => {
            console.log(`error occured while trying to update ${file.name} stats`, error);
          })
    }, TRACKING_DURATION);

    // Cleanup function to clear the timeout on unmount
    return () => clearTimeout(timeoutId);  
  }, [file]);



  return(
    <div id="content-viewer-wrapper">
      { loading ? <div className="loading"><IoIosHourglass className="float-left" size={96}/><div className="label">loading...</div></div> :
          online
            ? ( 
                file.contentType.startsWith('image')
                  ? <ImageViewer file={file} />
                  : file.contentType.startsWith('audio')
                    ?  <AudioViewer file={file} />
                    : file.contentType.startsWith('video')
                      ? <VideoViewer file={file} />
                      : file.contentType.startsWith('application')
                        ? <ApplicationDataViewer file={file} />
                        : file.contentType.startsWith('text')
                          ? <TextViewer file={file} />
                          : <div>Unknown file type</div>
              ) 
            : <div className="offline">
                <GoCloudOffline className="float-left" size={96}/>
                <div className="label">offline</div>
              </div>
      }
    </div>
  )
}

export const ImageViewer:JSX.Element = ({file}:ViewerProps) => {
  return(
    <img src={file.url} alt={file.name} />
  )
}

export const AudioViewer:JSX.Element = ({file}:ViewerProps) => {
  return(
    <div>
      <AVButton item={objectToQueueItem(file)} size={96} />
      <AddToQueueButton item={objectToQueueItem(file)} size={96} />
    </div>
  )
}

export const VideoViewer:JSX.Element = ({file}:ViewerProps) => {
    // const player = useRef<MediaPlayerInstance>(null);

  return(
    <VideoPlayer item={objectToQueueItem(file)} player={undefined}/>
  )
}

export const ApplicationDataViewer:JSX.Element = ({file}:ViewerProps) => {
  return(file.contentType.endsWith('.rom') || file.contentType.endsWith('-rom')
    ? <ArcadePlayer file={file} />
    : <div>archive here</div>
  )
}

export const TextViewer:JSX.Element = ({file}:ViewerProps) => {
  const [text, setText] = useState<string>('code text here');
  useEffect(() => {
    axios.get(file.url)
    .then((response) => {
      setText(response.data);
    }).catch(() => {
      console.log('error');
    });
  }, []);
  return(<pre>{text}</pre>)
}
