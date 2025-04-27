import { Nostalgist } from 'nostalgist';
import { useEffect, useState, useRef } from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import { ROM_FORMATS } from './index';



export const NostalgistPlayer = ({file}:ViewerProps):JSX.Element => {
  const emulatorCanvas = useRef<HTMLCanvasElement>(null);
  const [nostalgist, setNostalgist] = useState<Nostalgist | null>(null);
  const [savedState, setSavedState] = useState<Blob | null | undefined>(null);

  const launchNostalgist = async () => {
    const nostalgistObj =  await Nostalgist.launch({
      element: emulatorCanvas.current,
      core: ROM_FORMATS[file.contentType].core,
      rom: file.url,
    });
    console.log('nostalgistObj in fn', nostalgistObj)
    setNostalgist(nostalgistObj);
  };


  const saveNostalgistState = async () => {
    const stateData = await nostalgist?.saveState();
    setSavedState(stateData);
    console.log('log state', stateData);
  }


  useEffect(() => { launchNostalgist() }, []);

  useEffect(() => {
    console.log('nostalgist v2', nostalgist);

    addEventListener('keyup', (event) => {
      console.log('key', event.key);
      if (event.key === 'Escape') {
        nostalgist?.exit()
      }

      if (event.key === 's') {
        saveNostalgistState(); 
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
    <canvas id="canvas" ref={emulatorCanvas} width="950" height="500"></canvas>
  </>)
};

