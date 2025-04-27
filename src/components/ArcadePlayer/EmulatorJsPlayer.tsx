import React, { useEffect, useState } from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import { ROM_FORMATS } from './index';
import { ES_CONTROLLER_MAPPINGS } from './ejs_controller_mappings';

export const EmulatorJsPlayer: React.FC<ViewerProps> = ({file}) =>  {
  const core = ROM_FORMATS[file.contentType].core || "unknown";
  const controllerMapping = ES_CONTROLLER_MAPPINGS["Google Stadia"];
  const gameMapping = controllerMapping[core];
  useEffect(() => {
    console.log("EmulatorJsPlayer", file);
  }, []);
  return <iframe id="emulatorjs" src={`/emulatorjs.html?name=${file.name}&rom=${file.url}&mapping=${JSON.stringify(ES_CONTROLLER_MAPPINGS["Google Stadia"])}&core=${core}`}></iframe>;
};
