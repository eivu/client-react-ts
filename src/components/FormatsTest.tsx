import React from 'react';

const FormatsTest: React.FC = () => {
  const formats = [
    "application/msword",
    "application/pdf",
    "application/rtf",
    "application/vnd.microsoft.portable-executable",
    "application/vnd.ms-asf",
    "application/vnd.nintendo.snes.rom",
    "application/vnd.rar",
    "application/vnd.sqlite3",
    "application/x-atari-jaguar-rom",
    "application/x-atari-lynx-rom",
    "application/x-cue",
    "application/x-dosexec",
    "application/x-executable",
    "application/x-font-tex-tfm",
    "application/x-gameboy-color-rom",
    "application/x-gameboy-rom",
    "application/x-gamegear-rom",
    "application/x-gba-rom",
    "application/x-genesis-32x-rom",
    "application/x-genesis-rom",
    "application/xhtml+xml",
    "application/x-matroska",
    "application/xml",
    "application/x-mswinurl",
    "application/x-n64-rom",
    "application/x-nes-rom",
    "application/x-nintendo-ds-rom",
    "application/x-ole-storage",
    "application/x-partial-download",
    "application/x-pc-engine-rom",
    "application/x-sms-rom",
    "application/zip",
    "audio/flac",
    "audio/mp4",
    "audio/mpeg",
    "audio/vnd.wave",
    "audio/x-wav",
    "font/ttf",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/x-3ds",
    "image/x-tga",
    "image/x-xfig",
    "text/html",
    "text/plain",
    "text/x-log",
    "text/x-nfo",
    "text/x-scala",
    "text/x-vb",
    "video/3gpp",
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/quicktime",
    "video/webm",
    "video/x-flv",
    "video/x-msvideo"
  ];

  return (
    <table>
      <tbody className="align-baseline">
        {
          formats.map((format, _index) => (
            <tr>
              <td>
                {format}
              </td>
              <td>
                --
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
};

export default FormatsTest;