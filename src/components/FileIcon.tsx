import { FC } from 'react';
import { MdOutlineAudiotrack, MdOutlineImage, MdVideocam } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";

import { FaRegFileArchive, FaFileArchive, FaFileImage, FaFileVideo, FaFileAlt, FaFile } from "react-icons/fa";

export type FileIconProps = {
  contentType: string;
}

export const FileIcon:JSX.Element = ({contentType}:FileIconProps) => {
  return(
    <span className="file-icon">
      { contentType.startsWith('image') ?
          <MdOutlineImage className="image" /> :
            contentType.startsWith('audio') ?
              <MdOutlineAudiotrack className="audio"/> :
                contentType.startsWith('video') ?
                  <MdVideocam className="video" /> :
                    contentType.startsWith('application') ?
                      <FaRegFileArchive className="archive" /> :
                        contentType.startsWith('text') ?
                          <TiDocumentText className="text" /> :
                            <FaFile />
      }
    </span>
  )
}