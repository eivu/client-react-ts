import { CloudFile } from '@src/types/cloudFile';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ContentViewer } from '@src/components/ContentViewer';


export const MIME_FORMATS = {
  "doc": "application/msword",
  "pdf": "application/pdf",
  "rtf": "application/rtf",
  "wma": "application/vnd.ms-asf",
  "wmv": "application/vnd.ms-asf",
  "sfc": "application/vnd.nintendo.snes.rom",
  "smc": "application/vnd.nintendo.snes.rom",
  "cbr": "application/vnd.rar",
  "rar": "application/vnd.rar",
  "itdb": "application/vnd.sqlite3",
  "jag": "application/x-atari-jaguar-rom",
  "lnx": "application/x-atari-lynx-rom",
  "cue": "application/x-cue",
  "exe": "application/x-dosexec",
  // "sms": "application/x-executable",
  // "gbc": "application/x-font-tex-tfm",
  // "gb": "application/x-gameboy-color-rom",
  "gbc": "application/x-gameboy-color-rom",
  "gb": "application/x-gameboy-rom",
  "gg": "application/x-gamegear-rom",
  "gba": "application/x-gba-rom",
  "32x": "application/x-genesis-32x-rom",
  "gen": "application/x-genesis-rom",
  // "mp3": "application/xhtml+xml",
  "mkv": "application/x-matroska",
  "plist": "application/xml",
  "tmp": "application/xml",
  "xml": "application/xml",
  "url": "application/x-mswinurl",
  "n64": "application/x-n64-rom",
  "v64": "application/x-n64-rom",
  "z64": "application/x-n64-rom",
  "nes": "application/x-nes-rom",
  "nds": "application/x-nintendo-ds-rom",
  "db": "application/x-ole-storage",
  "part": "application/x-partial-download",
  "pce": "application/x-pc-engine-rom",
  "sms": "application/x-sms-rom",
  "cbz": "application/zip",
  "ipa": "application/zip",
  "zip": "application/zip",
  "flac": "audio/flac",
  "m4a": "audio/mp4",
  "mp3": "audio/mpeg",
  // "mp3": "audio/vnd.wave",
  "wav": "audio/x-wav",
  "fig": "font/ttf",
  // "smc": "font/ttf",
  "smc_2": "font/ttf",
  "bmp": "image/bmp",
  // "png": "image/bmp",""
  "gif": "image/gif",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  // "png": "image/jpeg",
  "png": "image/png",
  // "nds": "image/x-3ds",
  // "jag": "image/x-tga",
  // "fig": "image/x-xfig",
  "htm": "text/html",
  "html": "text/html",
  "htt": "text/html",
  "txt": "text/plain",
  "log": "text/x-log",
  "nfo": "text/x-nfo",
  "sc": "text/x-scala",
  // "cue": "text/x-vb",
  "3gp": "video/3gpp",
  // "m4a": "video/mp4",
  "m4v": "video/mp4",
  "mp4": "video/mp4",
  "mpg": "video/mpeg",
  "ogg": "video/ogg",
  "mov": "video/quicktime",
  "webm": "video/webm",
  "flv": "video/x-flv",
  "avi": "video/x-msvideo",
}

const parseContentType = (path: string): string => {
  const ext = path.split('.').pop();
  console.log('ext', ext);
  return MIME_FORMATS[ext] || "unknown";
}

const FileDropZone = () => {
  const [file, setFile] = useState<CloudFile | null>(null);

  const onDrop = useCallback(selectedFile => {
    const attr = {
      name: selectedFile[0].name,
      url: URL.createObjectURL(selectedFile[0]),
      contentType: parseContentType(selectedFile[0].path),
      filesize: selectedFile[0].size,
      md5: 'offline',
      uploadedAt: new Date().toISOString(),
      lastViewedAt: null,
      nsfw: false,
      secured: false,
      duration: 0,
      rating: null,
      numPlays: 0,
    }
    setFile(attr as CloudFile);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })



  if (file)
    return (
      <ContentViewer file={file} />
    );
  else
    return (
      <div {...getRootProps()} className="dropzone rounded-md !border-dashed !border-bodydark1 bg-gray hover:!border-primary dark:!border-strokedark dark:bg-graydark dark:hover:!border-primary">
        <input {...getInputProps()} />
        {/* <form
        className="dropzone rounded-md !border-dashed !border-bodydark1 bg-gray hover:!border-primary dark:!border-strokedark dark:bg-graydark dark:hover:!border-primary"
        id="demo-upload"
        action="/upload"
      > */}
        <div className="dz-message">
          <div className="mb-2.5 flex justify-center">
            <div className="shadow-10 flex h-15 w-15 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1867_11682)">
                  <path
                    d="M18.75 13.75C18.375 13.75 18.0313 14.0625 18.0313 14.4687V17.25C18.0313 17.5312 17.8125 17.75 17.5312 17.75H2.46875C2.1875 17.75 1.96875 17.5312 1.96875 17.25V14.4687C1.96875 14.0625 1.625 13.75 1.25 13.75C0.875 13.75 0.53125 14.0625 0.53125 14.4687V17.25C0.53125 18.3125 1.375 19.1562 2.4375 19.1562H17.5312C18.5938 19.1562 19.4375 18.3125 19.4375 17.25V14.4687C19.4688 14.0625 19.125 13.75 18.75 13.75Z"
                    fill=""
                  />
                  <path
                    d="M5.96875 6.46875L9.3125 3.21875V14.0313C9.3125 14.4063 9.625 14.75 10.0312 14.75C10.4062 14.75 10.75 14.4375 10.75 14.0313V3.21875L14.0937 6.46875C14.2187 6.59375 14.4062 6.65625 14.5938 6.65625C14.7812 6.65625 14.9688 6.59375 15.0938 6.4375C15.375 6.15625 15.3438 5.71875 15.0938 5.4375L10.5 1.0625C10.2187 0.8125 9.78125 0.8125 9.53125 1.0625L4.96875 5.46875C4.6875 5.75 4.6875 6.1875 4.96875 6.46875C5.25 6.71875 5.6875 6.75 5.96875 6.46875Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1867_11682">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <span className="font-medium text-black dark:text-white">
            Drop files here to upload
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </span>
        </div>
        {/* </form> */}
      </div>
    );
};

export default FileDropZone;
