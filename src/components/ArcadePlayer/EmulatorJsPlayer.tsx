import React, { useEffect, useState } from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import { ROM_FORMATS } from './index';
import { ES_CONTROLLER_MAPPINGS } from './ejs_controller_mappings';
import { RomCore } from './index';

export const EmulatorJsPlayer: React.FC<ViewerProps> = ({file}) =>  {
  const core = ROM_FORMATS[file.contentType].core || 'unkown';
  const controllerMapping = ES_CONTROLLER_MAPPINGS["Google Stadia"];
  const gameMapping = controllerMapping[core] || controllerMapping.unknown;
  // useEffect(() => {
  //   console.log("gameMapping", gameMapping);
  // }, []);

  return <iframe id="emulatorjs" src={`/emulatorjs.html?name=${file.name}&rom=${file.url}&mapping=${JSON.stringify(gameMapping)}&core=${core}`}></iframe>;
};
