import { FC } from 'react';
import { MdOutlineAudiotrack, MdOutlineImage, MdVideocam } from "react-icons/md";
import { FaFileArchive, FaFileImage, FaFileVideo, FaFileAlt, FaFile } from "react-icons/fa";

export type FileIconProps = {
  contentType: string;
}

export const FileIcon:JSX.Element = ({contentType}:FileIconProps) => {
  return(
    <>
      { contentType.startsWith('image') ?
          <MdOutlineImage className="image" /> :
            contentType.startsWith('audio') ?
              <MdOutlineAudiotrack className="audio"/> :
                contentType.startsWith('video') ?
                  <MdVideocam className="video" /> :
                    contentType.startsWith('application') ?
                      <FaFileArchive /> :
                        contentType.startsWith('text') ?
                          <FaFileAlt /> :
                            <FaFile />
      }
    </>
  )
}