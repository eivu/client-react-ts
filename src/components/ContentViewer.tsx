import { FC } from 'react';
import { CloudFile } from '../types/cloudFile';
import { objectToQueueItem } from '../common/objectToQueueItem';
import AVButton from './AVButton';
import AddToQueueButton from './AddToQueueButton';

export type ViewerProps = {
  file: CloudFile;
}

export const ContentViewer:FC = ({file}:ViewerProps) => {
  return(
    <>
      { file.contentType.startsWith('image') ?
          <ImageViewer file={file} /> :
            file.contentType.startsWith('audio') ?
              <AudioViewer file={file} /> :
                file.contentType.startsWith('video') ?
                  <VideoViewer file={file} /> :
                    file.contentType.startsWith('application') ?
                      <ArchiveViewer file={file} /> :
                        file.contentType.startsWith('text') ?
                          <pre></pre> :
                            <div>Unknown file type</div>
      }
    </>
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
  return(<div>audio here</div>)
}

export const TextViewer:JSX.Element = ({file}:ViewerProps) => {
  
  return(<pre>text here</pre>)
}







