import React, { useEffect, useState } from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import { ROM_FORMATS } from './index';

export const ES_CONTROLLER_MAPPINGS = {
  "Google Stadia": {
    0: 'B',
    1: 'Y',
    2: 'SELECT',
    3: 'START',
    4: 'UP',
    5: 'DOWN',
    6: 'LEFT',
    7: 'RIGHT',
    8: 'A',
    9: 'X',
    10: 'L',
    11: 'R',
    12: 'L2',
    13: 'R2',
    14: 'L3',
    15: 'R3',
    19: 'L STICK UP',
    18: 'L STICK DOWN',
    17: 'L STICK LEFT',
    16: 'L STICK RIGHT',
    23: 'R STICK UP',
    22: 'R STICK DOWN',
    21: 'R STICK LEFT',
    20: 'R STICK RIGHT',
    24: 'QUICK SAVE STATE',
    25: 'QUICK LOAD STATE',
    26: 'CHANGE STATE SLOT',
    27: 'FAST FORWARD',
    28: 'SLOW MOTION',
    29: 'REWIND'
  }
}

export const EmulatorJsPlayer: React.FC<ViewerProps> = ({file}) =>  {
  useEffect(() => {
    console.log("EmulatorJsPlayer", file);
  }, []);
  return <iframe id="emulatorjs" src={`/emulatorjs.html?name=${file.name}&rom=${file.url}&mapping=${JSON.stringify(ES_CONTROLLER_MAPPINGS["Google Stadia"])}&core=${ROM_FORMATS[file.contentType].core}`}></iframe>;
};
