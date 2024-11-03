import { JSX, useEffect, useState } from 'react';
import { CloudFile } from '../types/cloudFile';
import { objectToQueueItem } from '../common/objectToQueueItem';
import AVButton from './AVButton';
import AddToQueueButton from './AddToQueueButton';
import axios from 'axios';
import { GoCloudOffline } from "react-icons/go";
import { IoIosHourglass } from "react-icons/io";

export type ViewerProps = {
  file: CloudFile;
}

export const ContentViewer:JSX.Element = ({file}:ViewerProps) => {
  const [online, setOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    file && axios.head(file.url)
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
  }, []);



  return(
    <div id="content-viewer-wrapper">
      { loading ? <div className="loading"><IoIosHourglass className="float-left" size={96}/><div className="label">loading...</div></div> :
          online ? 
            ( 
              file.contentType.startsWith('image') ?
                <ImageViewer file={file} /> :
                  file.contentType.startsWith('audio') ?
                    <AudioViewer file={file} /> :
                      file.contentType.startsWith('video') ?
                        <VideoViewer file={file} /> :
                          file.contentType.startsWith('application') ?
                            <ArchiveViewer file={file} /> :
                              file.contentType.startsWith('text') ?
                                <TextViewer file={file} /> :
                                  <div>Unknown file type</div>
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
  return(
    <video reff="video_tag" src={file.url} controls/>
  )
}

export const ArchiveViewer:JSX.Element = ({file}:ViewerProps) => {
  return(<div>archive here</div>)
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
