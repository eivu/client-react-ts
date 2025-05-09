import React from 'react';
import { JSX, useEffect, useState } from 'react';
import { CloudFile } from '@src/types/cloudFile';
import { objectToQueueItem } from '@src/common/objectToQueueItem';
import AVButton from './AVButton';
import AddToQueueButton from './AddToQueueButton';
import axios from 'axios';
import { GoCloudOffline } from "react-icons/go";
import { IoIosHourglass } from "react-icons/io";
import { VideoPlayer } from './VideoPlayer';
import { ArcadePlayer } from './ArcadePlayer';
import { ACTIVE_DEBUGGING, TRACKING_DURATION } from '@src/constants';
import api from '@src/services/api.config';

export type ViewerProps = {
  file: CloudFile;
}

export const ContentViewer: React.FC<ViewerProps> = ({file}) =>  {
  const romRegex = /^application\/.*rom$/;
  const [online, setOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!file) {
      setLoading(false);
      setOnline(false);
    } else if (file.url.startsWith('blob:')) {
       setOnline(true);
       setLoading(false);
    } else {
      axios.head(`${file.url}?rando=${Math.random()}`)
           .then((response) => {
             if (response.status === 200) {
              status = true;
               setOnline(true);
             } else {
               setLoading(false);
             }
             setLoading(false);
           }).catch(() => {
             setOnline(false);
             setLoading(false);
           });}
  }, [file]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // don't update stats for audio and video files
      online &&
        !file.contentType.startsWith('audio') &&
        !file.contentType.startsWith('video') &&
        !romRegex.test(file.contentType) &&
        api.post(`/cloud_files/${file.md5}/update_stats`)
          .then((response) => {
            ACTIVE_DEBUGGING && console.log(`${file.name} stats updated`, response);
          }).catch((error) => {
            console.log(`error occured while trying to update ${file.name} stats`, error);
          })
    }, TRACKING_DURATION);

    // Cleanup function to clear the timeout on unmount
    return () => clearTimeout(timeoutId);  
  }, [online]);



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

export const ImageViewer: React.FC<ViewerProps> = ({file}) =>  {
  return(
    <img src={file.url} alt={file.name} />
  )
}

export const AudioViewer: React.FC<ViewerProps> = ({file}) =>  {
  return(
    <div>
      <AVButton item={objectToQueueItem(file)} size={96} />
      <AddToQueueButton item={objectToQueueItem(file)} size={96} />
    </div>
  )
}

export const VideoViewer: React.FC<ViewerProps> = ({file}) =>  {
    // const player = useRef<MediaPlayerInstance>(null);

  return(
    <VideoPlayer item={objectToQueueItem(file)} player={undefined}/>
  )
}

export const ApplicationDataViewer: React.FC<ViewerProps> = ({file}) =>  {
  return(file.contentType.endsWith('.rom') || file.contentType.endsWith('-rom')
    ? <ArcadePlayer file={file} />
    : <div>archive here</div>
  )
}

export const TextViewer: React.FC<ViewerProps> = ({file}) => {
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
