import { NostalgistPlayer } from './NostalgistPlayer';
import { useEffect, useState } from 'react';
import { type ViewerProps } from '../ContentViewer';


type RomFormat = {
  core: string | null,
  emulator: string | null,
  platform: string
}

type RomFormatArray = {
  [key: string]: RomFormat
}

export const ROM_FORMATS:RomFormatArray = {
  "application/x-atari-2600-rom": {
    "core": null,
    "emulator": null,
    "platform": "Atari2600"
  },
  "application/x-atari-5200-rom": {
    "core": null,
    "emulator": null,
    "platform": "Atari5200"
  },
  "application/x-atari-7800-rom": {
    "core": null,
    "emulator": null,
    "platform": "Atari7800"
  },
  "application/x-colecovision-rom": {
    "core": null,
    "emulator": null,
    "platform": "Colecovision"
  },
  "application/x-nes-rom": {
    "core": "fceumm",
    "emulator": "nostalgist",
    "platform": "NES"
  },
  "application/x-genesis-rom": {
    "core": "genesis_plus_gx",
    "emulator": "nostalgist",
    "platform": "Genesis"
  },
  "application/x-genesis-32x-rom": {
    "core": null,
    "emulator": null,
    "platform": "32x"
  },
  "application/x-atari-jaguar-rom": {
    "core": null,
    "emulator": null,
    "platform": "Jaguar"
  },
  "application/x-atari-lynx-rom": {
    "core": null,
    "emulator": null,
    "platform": "Lynx"
  },
  "application/x-neo-geo-pocket-rom": {
    "core": null,
    "emulator": null,
    "platform": "NeoGeo Pocket"
  },
  "application/x-neo-geo-pocket-color-rom": {
    "core": null,
    "emulator": null,
    "platform": "NeoGeo Pocket Color"
  },
  "application/x-nintendo-3ds-rom": {
    "core": null,
    "emulator": null,
    "platform": "Ninento 3DS"
  },
  "application/x-n64-rom": {
    "core": null,
    "emulator": null,
    "platform": "Nintendo64"
  },
  "application/x-nintendo-ds-rom": {
    "core": null,
    "emulator": null,
    "platform": "Nintendo64"
  },
  "application/vnd.nintendo.snes.rom": {
    "core": "snes9x",
    "emulator": "nostalgist",
    "platform": "SNES"
  },
  "application/x-pc-engine-rom": {
    "core": null,
    "emulator": null,
    "platform": "PCEngine"
  },
  "application/x-virtual-boy-rom": {
    "core": null,
    "emulator": null,
    "platform": "VirtualBoy"
  },
  "application/x-gba-rom": {
    "core": "mgba",
    "emulator": "nostalgist",
    "platform": "GameBoyAdvance"
  },
  "application/x-gameboy-rom": {
    "core": "mgba",
    "emulator": "nostalgist",
    "platform": "GameBoy"
  },
  "application/x-gameboy-color-rom": {
    "core": "mgba",
    "emulator": "nostalgist",
    "platform": "GameBoy Color"
  },
  "application/x-gamegear-rom": {
    "core": null,
    "emulator": null,
    "platform": "GameGear"
  }
}

export const ArcadePlayer = ({file}:ViewerProps):JSX.Element => {
  const [readyToPlay, setReadyToPlay] = useState<boolean>(false);


  const handleKeyUp = (event: KeyboardEvent) => {
    console.log(event.key)
    if (event.key === 'p' || event.key === 'P') {
      setReadyToPlay(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener('keyup', handleKeyUp);
  }, [])
  

  return (
     readyToPlay
      ?
        <>
          {ROM_FORMATS[file.contentType].emulator === "nostalgist" && (
            <NostalgistPlayer file={file} />
          )}
        </>
      : <div>Click {`P`} to Play</div>
  )
};
