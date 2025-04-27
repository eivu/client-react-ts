import React from 'react';
import { NostalgistPlayer } from './NostalgistPlayer';
import { useEffect, useState } from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import api from '@src/services/api.config';
import { ACTIVE_DEBUGGING } from '@src/constants';


type RomFormat = {
  core: string | null,
  emulator: "ejs" | "nostalgist" | null,
  platform: string
}

type RomFormatArray = {
  [key: string]: RomFormat
}

export const ROM_FORMATS:RomFormatArray = {
  "application/x-atari-2600-rom": {
    "core": "stella2014",
    "emulator": "ejs",
    "platform": "Atari 2600",
  },
  "application/x-atari-5200-rom": {
    "core": "a5200",
    "emulator": "ejs",
    "platform": "Atari 5200"
  },
  "application/x-atari-7800-rom": {
    "core": "prosystem",
    "emulator": "ejs",
    "platform": "Atari 7800"
  },
  "application/x-colecovision-rom": {
    "core": "gearcoleco",
    "emulator": "ejs",
    "platform": "Colecovision"
  },
  "application/x-nes-rom": {
    "core": "fceumm",
    "emulator": "ejs",
    "platform": "NES"
  },
  "application/x-genesis-rom": {
    "core": "genesis_plus_gx",
    "emulator": "ejs",
    "platform": "Genesis"
  },
  "application/x-genesis-32x-rom": {
    "core": "picodrive",
    "emulator": "ejs",
    "platform": "32x"
  },
  "application/x-atari-jaguar-rom": {
    "core": "virtualjaguar",
    "emulator": "ejs",
    "platform": "Jaguar"
  },
  "application/x-atari-lynx-rom": {
    "core": "handy",
    "emulator": "ejs",
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
    "core": "mupen64plus_next",
    "emulator": "ejs",
    "platform": "Nintendo 64"
  },
  "application/x-nintendo-ds-rom": {
    "core": "melonds",
    "emulator": "ejs",
    "platform": "Nintendo DS"
  },
  "application/vnd.nintendo.snes.rom": {
    "core": "snes9x",
    "emulator": "ejs",
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
    "emulator": "ejs",
    "platform": "GameBoyAdvance"
  },
  "application/x-gameboy-rom": {
    "core": "mgba",
    "emulator": "ejs",
    "platform": "GameBoy"
  },
  "application/x-gameboy-color-rom": {
    "core": "mgba",
    "emulator": "ejs",
    "platform": "GameBoy Color"
  },
  "application/x-gamegear-rom": {
    "core": "genesis_plus_gx",
    "emulator": "ejs",
    "platform": "GameGear"
  }
}

export const ArcadePlayer = ({file}:ViewerProps):JSX.Element => {
  const [readyToPlay, setReadyToPlay] = useState<boolean>(false);
  const handleKeyUp = (event: KeyboardEvent) => {
    console.log(event.key)
    if (event.key === 'p' || event.key === 'P') {
      setReadyToPlay(true);
      api.post(`/cloud_files/${file.md5}/update_stats`)
        .then((response) => {
          ACTIVE_DEBUGGING && console.log(`${file.name} stats updated`, response);
        }).catch((error) => {
          console.log(`error occured while trying to update ${file.name} stats`, error);
        })
    }
  };

  useEffect(() => {
    document.body.addEventListener('keyup', handleKeyUp);
  }, [])

  return (
    readyToPlay
      ?
        ROM_FORMATS[file.contentType].emulator === "nostalgist"
          ?
            <NostalgistPlayer file={file} />
          :
            ROM_FORMATS[file.contentType].emulator === "ejs"
              ?
                <iframe id="emulatorjs" src={`/emulatorjs.html?rom=${file.url}&core=${ROM_FORMATS[file.contentType].core}`}></iframe>
              :
                <div>Unknown engine</div>
      : <div>Click P to Play</div>
  )
};
