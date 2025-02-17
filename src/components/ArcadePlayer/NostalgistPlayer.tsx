import { Nostalgist } from 'nostalgist';
import { useEffect, useState, useRef } from 'react';
import { type ViewerProps } from '../ContentViewer';
import { ROM_FORMATS } from './index';



export const NostalgistPlayer = ({file}:ViewerProps):JSX.Element => {
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

