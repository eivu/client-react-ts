import { Nostalgist } from 'nostalgist';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { type ViewerProps } from './ContentViewer';


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
    "core": "genesis_plus_gx",
    "emulator": "fceumm",
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
  const emulatorCanvas = useRef<HTMLCanvasElement>(null);
  const [nostalgist, setNostalgist] = useState<Nostalgist | null>(null);

  useEffect(() => {
    const launchNostalgist = async () => {
      const nostalgistObj =  await Nostalgist.launch({
        element: emulatorCanvas.current,
        core: ROM_FORMATS[file.contentType].core,
        rom: file.url,
      });
      console.log('nostalgistObj in fn', nostalgistObj)
      setNostalgist(nostalgistObj);

    };
    launchNostalgist();
  }, []);

  useEffect(() => {
    console.log('nostalgist v2', nostalgist);

    addEventListener('keyup', (event) => {
      console.log('key', event.key);
      if (event.key === 'Escape') {
        nostalgist?.exit()
      }
    })

    return () => {
      try {
        nostalgist?.exit();
      } catch(e) {
        console.error('error exiting nostalgist', e)
      } finally {
        // emulatorCanvas?.current?.remove();
      }
    }
  }, [nostalgist]);




  return (<>
    <canvas id="canvas" ref={emulatorCanvas} width="1000" height="500"></canvas>
  </>)
};

