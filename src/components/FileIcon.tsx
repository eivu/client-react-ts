import { FC } from 'react';
import { MdOutlineAudiotrack, MdOutlineImage, MdVideocam } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { BsJoystick } from "react-icons/bs";


import { FaRegFileArchive, FaFileArchive, FaFileImage, FaFileVideo, FaFileAlt, FaFile } from "react-icons/fa";

export type FileIconProps = {
  contentType: string;
}

export const FileIcon:JSX.Element = ({contentType}:FileIconProps) => {
  return(
    <span className="file-icon">
      { contentType.startsWith('image')
        ? <MdOutlineImage className="image" />
        : contentType.startsWith('audio')
          ? <MdOutlineAudiotrack className="audio"/>
          : contentType.startsWith('video')
            ? <MdVideocam className="video" />
              : contentType.startsWith('text')
                ? <TiDocumentText className="text" />
                : contentType.endsWith('-rom') || contentType.endsWith('.rom') 
                  ? <BsJoystick className="rom" />
                  : contentType.startsWith('application')
                    ? <FaRegFileArchive className="archive" />
                    : <FaFile />
      }
    </span>
  )
}